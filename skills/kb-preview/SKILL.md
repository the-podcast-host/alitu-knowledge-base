---
name: kb-preview
description: Start a local preview server for knowledge base articles. Use when the user wants to preview, view, browse, or check KB articles locally before syncing to Intercom.
---

# KB Preview

Start a local server to preview knowledge base articles in the browser.

## Usage

Run the server:

```
node skills/kb-preview/resources/server.js [articles_dir] [port]
```

Defaults:
- `articles_dir`: `articles/` (relative to the knowledge base root)
- `port`: `4100`

Then open `http://localhost:4100` in the browser.

## What it does

- Parses all `.html` article files from the articles directory
- Serves them with a sidebar for navigation and a filter/search box
- Shows article metadata (state, updated date, description) below the title
- Renders the article body with a serif font and styles that approximate the Help Center look
- Draft articles appear dimmed and italic in the sidebar
- Articles reload from disk on every request — no restart needed after edits

## When to use

Run this skill when the user asks to preview, view, or check an article locally. Start the server, then open the URL or use a browser tool to navigate to the specific article.

The URL for a specific article is `http://localhost:4100/<article-slug>` where the slug is the filename without `.html`.
