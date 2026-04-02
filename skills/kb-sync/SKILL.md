---
name: kb-sync
description: >
  Synchronise local knowledge base articles with Intercom. Use when the user asks to sync, push,
  update, or publish KB articles. Supports --full flag for full sync and --dry-run for report only.
  Triggers on: "sync kb", "sync articles", "push to intercom",
  "update intercom", "publish articles", or any request to synchronise articles with Intercom.
---

# Sync Knowledge Base to Intercom

Synchronise the Alitu knowledge base articles from the local repository to Intercom.

## Article location

All articles live in the `articles/` directory of the repository root. Each article is an HTML file with metadata in an HTML comment header at the top of the file.

## Article format

```html
<!--
id: {intercom_article_id}
title: {title}
state: {published|draft}
description: {short summary}
url: {help center url}
author_id: {numeric author id}
created_at: {unix timestamp}
updated_at: {unix timestamp}
-->
<html>
<head><title>{title}</title></head>
<body>
{article body HTML}
</body>
</html>
```

## Sync modes

- **Default (changed-only)**: Only syncs articles with local git changes. Fast, but won't detect remote-only edits or drift in unchanged files.
- **Full sync** (`--full`): Compares every local article against Intercom. Use this to verify everything is in sync or to detect remote-only changes across the whole KB.

If the user just says "sync kb" without `--full`, use changed-only mode. Tell the user which mode is running and remind them they can run a full sync if they want to ensure everything is up to date. For example: *"Running changed-only sync (3 files modified locally). Run with `--full` to compare all articles against Intercom."*

## Sync procedure

### 1. Identify articles to sync

**Changed-only mode (default):** Use `git diff` and `git status` to find which article files in `articles/` have been modified, added, or are untracked since the last commit. Only these articles need to be synced. If no articles have local changes, report that everything is in sync and stop.

**Full sync mode:** Use all `.html` files in the `articles/` directory.

### 2. Read local articles

For each article to sync, parse the HTML to extract the metadata comment header and the body content (between `<body>` and `</body>` tags).

### 3. Fetch Intercom state

**Changed-only mode:** For each local article that has an `id`, call the Intercom `get_article` API to fetch its current state. Fetch articles in parallel (multiple concurrent `get_article` calls) rather than sequentially.

**Full sync mode:** Call `list_articles` with `per_page: 150` and paginate to fetch all. Build a map of article ID to current Intercom state (title, description, body, state). Also note any Intercom articles that have no matching local file — report these as remote-only articles.

### 4. Detect remote-only changes

Before comparing content, check for articles where Intercom's `updated_at` is newer than the local `updated_at` timestamp. These may have been edited directly in Intercom since the last sync. Flag them to the user with a warning — do not overwrite without explicit confirmation, as this could lose changes made by someone editing in Intercom directly.

### 5. Compare and identify changes

For each local article that has an `id` in its metadata, compare against the Intercom version:

- **title** - compare local title vs Intercom title
- **description** - compare local description vs Intercom description
- **body** - compare the content between `<body>` and `</body>` tags in the local file against the Intercom article body. Before comparing, normalise both sides: collapse whitespace, and strip query-string parameters from image/asset URLs (Intercom appends transient `?expires=...&signature=...&req=...` params that change on every API call and do not represent real content changes).
- **state** - compare local state (`published` or `draft`) vs Intercom state

An article needs updating if ANY of these fields differ.

Articles without an `id` in their metadata are new articles that exist only locally — flag these to the user but do not create them automatically.

### 6. Report changes to the user

Before making any updates, present a summary:

- Sync mode used (changed-only or full), with a reminder about the other mode
- Number of articles checked
- Articles with remote-only timestamp changes (warn — may lose Intercom edits)
- Number of articles that need updating, listed with the fields that changed. For body changes, include a brief description of what changed (e.g. "added 2 paragraphs under Getting Started", "updated link from old-url to new-url", "rewrote intro section") rather than just reporting "body changed".
- Number of articles that are already in sync
- Any local-only articles (no Intercom ID)
- Any remote-only articles (in Intercom but no local file) — full sync mode only

**State change warnings:** If any articles have a state change (draft → published or published → draft), list them separately with a prominent warning. Publishing makes an article live on the Help Center; unpublishing removes it. These are high-impact changes that require explicit confirmation from the user before proceeding — do not bundle them silently into a general "X articles to update" count.

If the user said `--dry-run` or asked for a dry run, stop here after showing the report. Do not ask for confirmation or push any changes.

Otherwise, ask the user to confirm before proceeding with updates. If there are state changes, ask for confirmation of those specifically (e.g. "This will **publish** 2 articles to the live Help Center. Confirm?").

### 7. Push updates to Intercom

For each article that needs updating, call the Intercom `update_article` API with only the fields that changed:

- `id` (always required)
- `title` (if changed)
- `description` (if changed)
- `body` (if changed)
- `state` (if changed)

Process articles sequentially. Report the result after each update.

### 8. Update local metadata

After a successful update to Intercom, update the local article file's `updated_at` timestamp to match the value returned by Intercom. If the article was newly published and now has a URL, update the `url` field in the local metadata too.

### 9. Final summary

Report:
- How many articles were updated successfully
- Any failures (with article title and error)
- Any articles that were skipped

## Important notes

- NEVER delete articles from Intercom. This skill only updates existing articles.
- NEVER change the `author_id` or `created_at` fields.
- If an article's body in the local file is empty, skip it and warn the user rather than blanking the Intercom article.
- The `id` field in the local file metadata is the canonical link between a local file and its Intercom article. Do not match by title.
- Always ask for user confirmation before pushing changes.
- Articles may contain images from two sources: Intercom CDN (`downloads.intercomcdn.com`) and S3 (`alitu-knowledge-base-assets.s3.eu-west-1.amazonaws.com`). Both are valid. S3 URLs are stable and do not have transient query params — only strip params from Intercom CDN URLs during comparison.
