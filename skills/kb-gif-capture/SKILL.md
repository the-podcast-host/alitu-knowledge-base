---
name: kb-gif-capture
description: Capture short Alitu Help Center GIFs or screenshots from product flows using Playwright and ffmpeg. Use when a KB article needs UI visuals, especially when a short state change should be shown with a synthetic cursor and click pulse instead of static screenshots.
---

# KB GIF Capture

Use this when the user wants a reusable Help Center asset workflow, or when a KB article needs a GIF or screenshot sequence taken from the Alitu product.

This skill is for `asset capture`, not for writing the article copy itself.

## Read First

Start here:

- [references/capture-patterns.md](./references/capture-patterns.md)

## Core Rule

Default to the smallest useful asset.

- Use `static screenshots` when the flow is mostly navigation or one stable UI state.
- Use a `GIF` only when motion or a visible state change helps the reader.
- Keep GIFs short, usually one bounded action over 2 to 4 seconds.

## Preconditions

Before capturing anything, confirm:

1. The flow is deterministic enough to script.
2. The account or mocked state is safe to show.
3. Any upload fixture lives inside the workspace, not only under `/tmp`.
4. The output location is agreed. Default to:
   - `/private/tmp/<slug>-assets`

## Environment Choice

Choose the capture surface in this order:

1. Real app with a stable test account
   - use when the path is already known to work and does not expose customer data
2. Local app with mocks
   - use when production state is brittle, risky, or unavailable
3. Static screenshots only
   - use when the app cannot be made deterministic enough for a clean GIF

Do not force a GIF if the environment is unstable.

## Workflow

1. Define the single thing the asset needs to show.
   - good: upload page before and after a file is added
   - bad: a whole end-to-end workflow with multiple branches
2. Prepare the page state.
   - use a fresh page load before capture
   - seed any files or data needed for the flow
3. Hide UI noise.
   - hide Intercom
   - hide toast/notification regions if they are not the subject of the asset
   - hide incidental tooltips unless the tooltip is the point
4. Add a synthetic cursor and click feedback for GIFs.
   - Playwright screenshots do not include the real OS cursor
   - use an in-page cursor overlay plus a click pulse
   - for native-dialog gaps such as upload or download, an optional short handoff overlay can help
5. Capture frames.
   - save sequential PNGs to a temporary frames directory
   - use evenly spaced timing
   - keep framing stable
6. Render the GIF with the bundled script.
7. Review the asset before handing it off.
   - inspect at least one pre-action frame, one click frame, and one post-action frame
8. If the GIF still feels unclear, prefer fewer states or switch to screenshots.

## Known Constraints

- Native file pickers are not captured in page screenshots.
- Do not try to show the OS file chooser.
- For upload flows:
  - show the cursor moving to `Click to upload`
  - show the click pulse
  - optionally show a short handoff overlay such as `Choose a file from your computer`
  - if you use the overlay, keep it on screen long enough to read, usually about `0.8` to `1.2` seconds
  - cut straight to the post-upload state
- Fresh page loads matter. Reused upload pages can become stale and stop reacting reliably.
- Playwright file uploads can be more reliable through the page's file input than through the visible chooser flow.
- Browser sandbox rules mean uploaded fixture files must exist inside the workspace path.

## Asset Rules

For KB GIFs:

- keep width around `960px`
- keep frame rate around `3` to `5` fps
- keep the clip short
- keep the viewport consistent
- avoid showing unrelated account or product state when possible

For screenshots:

- use the same noise-hiding rules
- prefer one screenshot per meaningful state
- do not rely on screenshots to replace written steps

## Output

Default outputs:

- frames: `/private/tmp/<slug>-frames`
- final assets: `/private/tmp/<slug>-assets`

All finished assets (GIFs, screenshots) for an article go into the article's assets directory at `/private/tmp/<slug>-assets/`. This directory is the staging area for S3 upload.

If the user wants another location, use that instead.

## Uploading assets to S3

New images and videos cannot be uploaded to Intercom via API. Instead, upload them to the `alitu-knowledge-base-assets` S3 bucket.

Use the bundled upload script:

```
scripts/upload_assets.sh /private/tmp/<slug>-assets <article-slug>
```

This uploads all files in the assets directory to `s3://alitu-knowledge-base-assets/articles/<article-slug>/` and prints the public URLs. Use these URLs in the article HTML.

**Public URL pattern:**
```
https://alitu-knowledge-base-assets.s3.eu-west-1.amazonaws.com/articles/<article-slug>/<filename>
```

**Important:** Upload assets *before* writing the article HTML, so the correct URLs can be embedded in the `<img>` or `<video>` tags.

## Scripts

- [scripts/render_gif.sh](./scripts/render_gif.sh) — render PNGs to GIF
- [scripts/upload_assets.sh](./scripts/upload_assets.sh) — upload assets to S3 and print URLs

## Do Not

- Do not record long, wandering flows.
- Do not show native dialogs and pretend they are part of the page.
- Do not rely on the real cursor being visible in screenshots.
- Do not capture customer data or personal accounts.
- Do not keep retrying a brittle flow when two screenshots would communicate the point better.
