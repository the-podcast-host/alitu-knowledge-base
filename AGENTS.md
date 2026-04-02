# Alitu Knowledge Base

This repository is the canonical source of truth for all Alitu Help Center articles. Articles are stored as HTML files in `articles/` and synced to Intercom.

## Key paths

- `articles/` - All knowledge base articles (HTML with metadata headers)
- `style-guides/article-style-guide.md` - House style for writing articles
- `skills/` - Shared skill definitions (tool-agnostic)
  - `kb-article-writing/` - Drafting and revising articles in house style
  - `kb-gif-capture/` - Capturing screenshots and GIFs from product flows
  - `kb-sync/` - Syncing articles to Intercom
  - `kb-preview/` - Local preview server for browsing articles

## Article format

Each article is an HTML file with an HTML comment header containing metadata fields: id, title, state, description, url, author_id, created_at, updated_at. The body content sits between `<body>` and `</body>` tags.

## Assets (images and videos)

- Existing article images are hosted on Intercom's CDN (`downloads.intercomcdn.com`) — leave these URLs as-is.
- New images and videos go to S3 bucket `alitu-knowledge-base-assets` (eu-west-1) since the Intercom API does not support file uploads.
- S3 URL pattern: `https://alitu-knowledge-base-assets.s3.eu-west-1.amazonaws.com/articles/<article-slug>/<filename>`
- Use `skills/kb-gif-capture/scripts/upload_assets.sh` to upload assets and get public URLs.
- Stage assets in `/private/tmp/<article-slug>-assets/` before uploading.

## Working with articles

- When editing articles, preserve the metadata comment header format exactly.
- The `id` field links the local file to its Intercom counterpart - never change it.
- Use the `kb-sync` skill to push changes to Intercom after editing.
- Follow `style-guides/article-style-guide.md` when writing or editing article content.
- Use the `kb-preview` skill to preview articles locally before syncing (`node skills/kb-preview/resources/server.js` on port 4100).
