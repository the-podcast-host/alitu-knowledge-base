# Alitu Knowledge Base

This is the canonical knowledge base for Alitu. All Help Center articles are maintained here as HTML files and synced to Intercom.

## Structure

```
articles/          # All knowledge base articles (HTML)
skills/            # Shared skill definitions (tool-agnostic)
.claude/skills/    # Claude Code wrappers (reference shared skills)
.codex/skills/     # Codex wrappers (reference shared skills)
```

## Articles

Each article is an HTML file in `articles/` with metadata stored in an HTML comment header:

```html
<!--
id: 12345678
title: Article Title
state: published
description: Short summary of the article
url: https://help.alitu.com/en/articles/...
author_id: 1234567
created_at: 1631655430
updated_at: 1774442660
-->
<html>
<head><title>Article Title</title></head>
<body>
...article content...
</body>
</html>
```

- **id** - Intercom article ID
- **state** - `published` or `draft`
- **description** - Short summary shown in search results
- **url** - Live Help Center URL (empty for drafts)

## Syncing with Intercom

Use the `kb-sync` skill to push local changes to Intercom. This works in both Claude Code and Codex:

```
# Claude Code
/kb-sync

# Codex
sync kb
```

The skill compares each local article against the live Intercom version and updates title, description, body, and publish state as needed. The core procedure lives in `skills/kb-sync/SKILL.md` with thin wrappers for each tool in `.claude/` and `.codex/`.

## Assets (images and videos)

Existing article images are hosted on Intercom's CDN. New images and videos go to the `alitu-knowledge-base-assets` S3 bucket (eu-west-1) since the Intercom API does not support file uploads.

Upload assets using the bundled script:

```
skills/kb-gif-capture/scripts/upload_assets.sh /private/tmp/<slug>-assets <article-slug>
```

Public URL pattern: `https://alitu-knowledge-base-assets.s3.eu-west-1.amazonaws.com/articles/<article-slug>/<filename>`

## Previewing articles locally

Use the `kb-preview` skill to browse articles in a local server:

```
node skills/kb-preview/resources/server.js [articles_dir] [port]
```

Defaults to `articles/` on port `4100`. Open `http://localhost:4100` to browse, or `http://localhost:4100/<slug>` for a specific article. Articles reload from disk on each request.

## Writing new articles

See `skills/kb-article-writing/references/article-style-guide.md` for the house style. New articles should follow the same HTML + metadata format and be synced to Intercom using the skill.
