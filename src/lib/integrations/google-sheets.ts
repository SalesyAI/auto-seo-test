import { google } from 'googleapis';
import type { RawArticle, PublishedArticle } from '@/src/types';

const getSheetsClient = () => {
  const credentials = {
    type: 'service_account',
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
};

export async function getPendingArticle(): Promise<RawArticle | null> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'articles!A1:D',
  });

  const rows = response.data.values || [];
  if (rows.length < 2) return null;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row[2] === 'pending') {
      return {
        rowId: row[0] || String(i),
        rawText: row[1] || '',
        status: 'pending',
      };
    }
  }

  return null;
}

export async function markArticleAsProcessed(rowId: string): Promise<void> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'articles!A1:A',
  });

  const rows = response.data.values || [];
  let rowIndex = -1;

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === rowId) {
      rowIndex = i + 1;
      break;
    }
  }

  if (rowIndex === -1) return;

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `articles!C${rowIndex}:D${rowIndex}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [['processed', new Date().toISOString()]],
    },
  });
}

export async function addPublishedArticle(article: PublishedArticle): Promise<void> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const newRow = [
    article.slug,
    article.title,
    article.excerpt,
    article.tag,
    article.content,
    article.seoTitle,
    article.seoDescription,
    article.readTime,
    article.publishedAt,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'published!A1:I',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [newRow],
    },
  });
}

export async function getAllPublishedArticles(): Promise<PublishedArticle[]> {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'published!A1:I',
  });

  const rows = response.data.values || [];
  if (rows.length < 2) return [];

  return rows.slice(1).map((row) => ({
    slug: row[0] || '',
    title: row[1] || '',
    excerpt: row[2] || '',
    tag: row[3] || '',
    content: row[4] || '',
    seoTitle: row[5] || '',
    seoDescription: row[6] || '',
    readTime: row[7] || '',
    publishedAt: row[8] || '',
  }));
}