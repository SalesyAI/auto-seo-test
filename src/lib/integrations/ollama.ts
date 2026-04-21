import type { OllamaResponse } from '@/src/types';

const SYSTEM_PROMPT = `You are an expert SEO Content Strategist and Copywriter specializing in automation, business operations, and tech infrastructure. Your writing style is:
- Anti-hype, authoritative, and conversational but sharp
- No bloated corporate language
- Focus on practical insights for scaling agencies and founders

Transform the raw article content into a professionally structured blog post. Your response must be valid JSON with these exact fields:

{
  "slug": "url-friendly-identifier-using-kebab-case",
  "title": "Compelling SEO-optimized title (60 chars max for SEO)",
  "excerpt": "1-2 sentence summary for blog listing (150 chars max)",
  "tag": "Primary category (e.g., Automation, CRM, Cold Email, AI, Strategy)",
  "content": "Full structured HTML/Markdown content with H2/H3 hierarchy, bullet points, and compelling narrative",
  "seoTitle": "Optimized title tag for search engines (60 chars max)",
  "seoDescription": "Meta description for search engines (160 chars max)",
  "readTime": "Estimated reading time in format like '5 min read'"
}

Rules:
- Extract a relevant tag from the content
- Generate a URL-friendly slug from the title
- Calculate read time as: word count / 200 (round up)
- Content should have clear H2 headings and structured sections
- Include practical insights and avoid fluff
- Output ONLY valid JSON, no additional text`;

export async function generateSeoArticle(rawText: string): Promise<OllamaResponse> {
  const baseUrl = process.env.OLLAMA_BASE_URL || 'https://ollama.com/api/chat';
  const apiKey = process.env.OLLAMA_API_KEY;
  const model = process.env.OLLAMA_MODEL || 'gemma4:31b-cloud';
  
  console.log('Ollama config:', { baseUrl, hasApiKey: !!apiKey, model });

  const requestBody = {
    model: model,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: rawText },
    ],
    stream: false,
  };

  console.log('Calling Ollama at:', baseUrl);

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ollama API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log('Ollama response data keys:', Object.keys(data));
  
  let content = '';
  if (data.message?.content) {
    content = data.message.content;
  } else if (data.choices?.[0]?.message?.content) {
    content = data.choices[0].message.content;
  } else if (data.response?.message?.content) {
    content = data.response.message.content;
  } else {
    throw new Error('No content in Ollama response');
  }

  console.log('Extracted content:', content.substring(0, 100) + '...');

  try {
    const parsed = JSON.parse(content);
    return {
      slug: parsed.slug || '',
      title: parsed.title || '',
      excerpt: parsed.excerpt || '',
      tag: parsed.tag || 'Automation',
      content: parsed.content || '',
      seoTitle: parsed.seoTitle || parsed.title || '',
      seoDescription: parsed.seoDescription || parsed.excerpt || '',
      readTime: parsed.readTime || '5 min read',
    };
  } catch {
    throw new Error('Failed to parse Ollama response as JSON: ' + content.substring(0, 200));
  }
}
