import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getPendingArticle, markArticleAsProcessed, addPublishedArticle } from '@/src/lib/integrations/google-sheets';
import { generateSeoArticle } from '@/src/lib/integrations/ollama';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('Starting publish process...');
    
    const article = await getPendingArticle();
    console.log('Pending article:', article);

    if (!article) {
      return NextResponse.json({ success: true, message: 'No pending articles found' });
    }

    console.log('Calling Ollama API...');
    const seoArticle = await generateSeoArticle(article.rawText);
    console.log('Ollama response:', seoArticle);

    console.log('Adding to published sheet...');
    await addPublishedArticle({
      ...seoArticle,
      publishedAt: new Date().toISOString(),
    });

    console.log('Marking as processed...');
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    return NextResponse.json(
      { success: false, message: errorMessage, stack: errorStack },
      { status: 500 }
    );
  }
}