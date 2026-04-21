import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getPendingArticle, markArticleAsProcessed, addPublishedArticle } from '@/src/lib/integrations/google-sheets';
import { generateSeoArticle } from '@/src/lib/integrations/ollama';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');

  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const article = await getPendingArticle();

    if (!article) {
      return NextResponse.json({ success: true, message: 'No pending articles found' });
    }

    const seoArticle = await generateSeoArticle(article.rawText);

    await addPublishedArticle({
      ...seoArticle,
      publishedAt: new Date().toISOString(),
    });

    await markArticleAsProcessed(article.rowId);

    revalidatePath('/blog');
    revalidatePath('/');

    return NextResponse.json({
      success: true,
      message: 'Article published successfully',
      data: {
        slug: seoArticle.slug,
        title: seoArticle.title,
      },
    });
  } catch (error) {
    console.error('Publish error:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}