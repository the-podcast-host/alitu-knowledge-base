---
name: kb-sync
description: >
  Synchronise local knowledge base articles with Intercom. Use when the user asks to sync, push,
  update, or publish KB articles. Triggers on: "sync kb", "sync articles", "push to intercom",
  "update intercom", "publish articles", or any request to synchronise articles with Intercom.
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
  - Edit
  - Write
  - Agent
  - mcp__intercom__list_articles
  - mcp__intercom__get_article
  - mcp__intercom__update_article
---

# Sync KB — Claude Code Wrapper

Follow the full sync procedure defined in `skills/kb-sync/SKILL.md` at the repository root.

Read that file now and execute the procedure it describes.
