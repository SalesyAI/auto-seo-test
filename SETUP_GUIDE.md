# Google Sheets Setup Guide

## 1. Create a New Google Spreadsheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Rename the default sheet to: `articles`
4. Create a second sheet tab and rename to: `published`

## 2. Set Up the `articles` Sheet (Input Queue)

Add these headers in row 1:

| A | B | C | D |
|---|---|---|---|
| row_id | raw_text | status | processed_at |
| 1 | Paste your raw article content here... | pending | |

- **Column A (row_id)**: Unique identifier (auto-generated)
- **Column B (raw_text)**: Paste your unstructured article content
- **Column C (status)**: Use `pending` for new articles, will become `processed` after AI transforms it
- **Column D (processed_at)**: Will be filled automatically with timestamp

## 3. Set Up the `published` Sheet (Output)

Add these headers in row 1:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| slug | title | excerpt | tag | content | seo_title | seo_description | read_time | published_at |

This sheet will be populated automatically by the AI pipeline.

## 4. Set Up Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Go to **APIs & Services** > **Library**
4. Enable **Google Sheets API**
5. Go to **IAM & Admin** > **Service Accounts**
6. Click **Create Service Account**:
   - Name: `seo-blog-automation`
   - Role: **Editor** (or Viewer + with specific sheet access)
7. Click on the service account → **Keys** tab
8. Add **New Key** → **JSON**
9. Save the JSON file locally

## 5. Share Your Spreadsheet

1. Open your Google Sheet
2. Click **Share**
3. Add the service account email (e.g., `seo-blog-automation@your-project.iam.gserviceaccount.com`)
4. Set as **Editor**
5. Click **Send**

## 6. Copy Sheet ID

From your spreadsheet URL:
```
https://docs.google.com/spreadsheets/d/1abc123def456ghi789jkl012mno345pq/edit
```
The ID is: `1abc123def456ghi789jkl012mno345pq`

---

## Environment Variables to Add in Vercel

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=seo-blog-automation@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1abc123def456ghi789jkl012mno345pq
OLLAMA_API_KEY=your_ollama_api_key
OLLAMA_BASE_URL=https://cloud.ollama.ai/api/chat
OLLAMA_MODEL=gemma4:31b-cloud
CRON_SECRET=your_secret_for_manual_trigger
```

**Note**: Replace newlines in `GOOGLE_PRIVATE_KEY` with `\n` when setting in Vercel.