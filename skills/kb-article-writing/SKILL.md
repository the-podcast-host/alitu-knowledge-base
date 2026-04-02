---
name: kb-article-writing
description: Draft or revise Alitu knowledge-base articles so they match the published Help Center house style. Use when writing new KB articles, rewriting draft KB content, or normalizing rough help content into the established Alitu style.
---

# KB Article Writing

Use this when the user wants an Alitu Help Center article drafted, rewritten, normalized, or reviewed for style.

The default assumption is:

- published KB articles define house style
- draft KB articles are a contrast set and a failure-mode set, not equal-quality exemplars

## Read First

Start here:

- [`style-guides/article-style-guide.md`](../../style-guides/article-style-guide.md)

Read these only when you need deeper evidence or edge-case context:

- AI-writing trope cleanup reference:
  [references/ai-writing-tropes-to-avoid.md](./references/ai-writing-tropes-to-avoid.md)

## Core Job

Produce KB articles that feel like the stronger published Alitu articles:

- short task-first intro
- early scope, prerequisite, or warning note when needed
- one bounded task per article
- exact UI labels and settings paths
- H2 sections or ordered steps for the real workflow
- screenshot or GIF directly after the relevant step when visuals exist
- short support CTA only when the user could plausibly get stuck

The skill is about `how to write the article`, not `how to guess the facts`.

Before drafting, ground the article in current product reality.

## Gather Facts First

Before writing or rewriting a KB article, identify the source of truth for the content itself.

Use this order:

1. Existing KB and nearby KB articles
   - check whether the topic already exists in published or draft form
   - reuse exact product terminology and neighboring workflow boundaries when they are still correct
2. Source code and product implementation
   - when the article is about current product behavior, treat source as the main factual anchor
   - inspect the relevant repo and UI/API code paths before asserting how the product works
3. App-specific settings paths, labels, and screenshots
   - verify exact UI labels, menu names, and flows from code or current product-facing references
4. Support/reference notes only as secondary context
   - use the style guide and review notes for voice and structure
   - do not use them as the factual source for current functionality when code is available

If the article depends on behavior that may have changed recently, verify before drafting. Do not write KB copy from memory alone.

## Map Topic To Evidence

Use the topic to decide where the facts should come from:

- frontend/editor/recording/publish UI:
  - inspect `../alitu-frontend`
- backend behavior, hosting, account state, publishing integrations, workflow state:
  - inspect `../alitu-commander`
- processing/export/media-generation behavior:
  - inspect `../alitu-processor`
- local multi-service boot/wiring questions:
  - inspect `../../` (alitu-local root)

When the article spans multiple systems, read only enough from each repo to confirm the behavior the article claims.

## Content Before Style

Separate these two jobs:

- `content truth`
  - what the product actually does
  - what the limits, prerequisites, or edge cases are
  - what labels and settings are called
- `style shaping`
  - how to present that truth in Alitu KB house style

Do not let style confidence hide factual uncertainty.

If the implementation is unclear, stale, or contradictory:

- say so
- resolve it from source before drafting
- or write the article as a scoped draft with explicit uncertainty for the human reviewer

## Assets (Images and Videos)

Articles may include images (screenshots, GIFs) or videos. How these are handled depends on whether they already exist.

### Existing articles

Images and videos in existing articles are already hosted on Intercom's CDN (`downloads.intercomcdn.com`). Keep these URLs as-is — do not re-upload or change them unless the asset itself needs replacing.

### New or replacement assets

The Intercom API does not support file uploads. New images and videos are hosted on S3 instead.

**Workflow:**

1. Create assets (screenshots/GIFs) using the `kb-gif-capture` skill or manually.
2. Place all finished assets for the article in `/private/tmp/<article-slug>-assets/`.
3. Upload to S3 using the upload script:
   ```
   src/alitu-knowledge-base/skills/kb-gif-capture/scripts/upload_assets.sh /private/tmp/<article-slug>-assets <article-slug>
   ```
4. The script prints the public URL for each uploaded file. Use these URLs in the article HTML.

**URL pattern:**
```
https://alitu-knowledge-base-assets.s3.eu-west-1.amazonaws.com/articles/<article-slug>/<filename>
```

**HTML format for images:**
```html
<div class="intercom-container"><img src="<S3_URL>"></div>
```

**Important:**
- Upload assets *before* finalizing the article HTML so the correct URLs are embedded.
- Use descriptive filenames (e.g. `episode-builder-add-clip.gif`, not `screenshot1.png`).
- Keep the `intercom-container` wrapper div for consistency with existing articles.

## Default Workflow

1. Identify the article type:
   - `procedural task article`
   - `explainer / FAQ`
   - `workflow router`
2. Define the single main job of the page.
3. Pull any non-negotiable caveat to the top:
   - migration warning
   - hosting-only scope
   - unsupported browser/device
   - language or feature limitation
   - destructive action warning
4. Write the shortest useful intro that tells the user what they can do here.
5. Break the rest into:
   - H2 sections for subtopics or phases
   - ordered steps for sequences
   - bullets for options, specs, or best-practice checks
6. Link to adjacent KB articles instead of expanding into a second article inside the first one.
7. End with a short support path only if the article has realistic failure modes.

## House Rules

### Voice

- Write in second person.
- Be helpful, calm, and specific.
- Prefer practical wording over polished-sounding wording.
- Use light reassurance, not constant reassurance.

### Structure

- Keep one article focused on one bounded task or one tightly scoped question.
- Use real headings, not bold text pretending to be headings.
- Keep paragraphs short.
- Use ordered steps only when there is a true sequence.

### Product Specificity

- Name exact UI labels.
- Name exact settings paths when possible.
- Make the Alitu-specific action clear before linking to third-party destinations.

### Linking

- Prefer descriptive link text.
- Link to the exact downstream KB article or exact app page when helpful.
- Use external links only when the user must leave Alitu.

## Do Not Imitate

Do not copy these draft or legacy failure modes:

- wrapper pages with almost no written guidance
- empty or stub articles
- fake numbering inside paragraphs
- H1 misuse for internal sections
- raw URLs in body copy where descriptive links would be clearer
- vague link text like `here`
- hype, market-leading claims, or product-comparison sales copy as the default voice
- emoji, excessive exclamation marks, or chatty filler
- roadmap language unless the current limitation is the point of the article
- giant mixed-purpose pages that try to be a help article, glossary, comparison page, and resource list at the same time

Also avoid AI-shaped prose habits:

- hype, false profundity, or fake suspense
- `not X, but Y` reframes unless they genuinely clarify the point
- filler transitions like `It's worth noting`, `Importantly`, or `Here's the thing`
- dramatic fragment paragraphs used only for emphasis
- analogy-heavy teacher voice when the direct explanation is clearer
- vague authority phrases like `experts say` without naming the source
- em-dash overuse
- bold-first bullets as a default formatting style

If the draft starts sounding polished in a generic way instead of useful in a specific way, rewrite it more plainly.

## Default Article Shapes

### Procedural Task Article

Use this for setup, publishing, editing actions, troubleshooting, and settings changes.

Shape:

1. one-sentence opener
2. optional top note or warning
3. ordered steps or short H2 task sections
4. visuals near the relevant step
5. short wrap-up
6. short support CTA if needed

### Explainer / FAQ

Use this for concept questions or short orientation topics.

Shape:

1. short framing paragraph
2. question-style H2s
3. one or two short paragraphs per answer
4. links to deeper how-to articles if needed

### Workflow Router

Use this only when the user truly needs a page that routes them across multiple related flows.

Shape:

1. define the user's situation
2. explain the stage breakdown
3. link to narrower articles for each branch

Do not let router pages become vague catch-alls.

## Fast Template

Use this as the default skeleton:

```markdown
# <Title>

<One short paragraph that states the task or answer.>

> <Optional warning, limitation, or prerequisite.>

## <First task or question section>

<Short explanation or first step.>

1. <Step>
2. <Step>
3. <Step>

## <Second task or question section>

<Short explanation or next steps.>

<Optional related article links when they genuinely narrow the next action.>

If you have any questions, please reach out using the chat box.
```

## Review Checklist

Before finalizing, check:

- Does the title match what a user would search for?
- Does the intro state the task or answer quickly?
- Is the article tightly scoped?
- Are the key caveats surfaced early?
- Are the UI labels accurate?
- Are the steps concrete enough to follow without guessing?
- Does each link have a clear purpose?
- Are screenshots supporting the text rather than replacing it?
- Did you avoid draft failure modes and promotional drift?

## Final Cleanup Pass

After the article is factually correct and structurally sound, do one short polish pass:

1. remove promo drift, filler, and fake suspense
2. replace generic or ornate wording with plain concrete wording
3. remove AI-shaped rhetorical patterns if they appear more than once
4. stop once the article sounds natural, direct, and specific

Do not optimize for avoiding every trope at the cost of clarity.

If the draft still feels AI-shaped, read:

- [references/ai-writing-tropes-to-avoid.md](./references/ai-writing-tropes-to-avoid.md)

Use that file as a cleanup aid, not as the main writing engine.
