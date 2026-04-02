# Alitu KB Article Style Guide

Last updated: 2026-03-23

Use this as the primary writing reference for new Alitu Help Center articles.

This guide is for drafting. It is not the research memo.

If you need the evidence behind these rules, see:

- `notes/reference/kb-style-review/aggregate-findings.md`
- `notes/reference/kb-draft-contrast-review/aggregate-findings.md`

## Core Goal

Write KB articles that feel like the stronger published Alitu articles:

- direct
- practical
- easy to scan
- specific to the product
- short unless the topic genuinely needs more structure

The reader should quickly understand:

- what this article helps them do
- what they need to know before starting
- what exact steps or answer apply to them
- where to go next if they get stuck

## Core Rules

### 1. Lead with the task or answer

Open with one short paragraph that tells the reader what this article helps them do.

Good openings:

- `You can reset your password from your account page.`
- `Podcast chapters let listeners jump to specific parts of an episode.`
- `You can publish your episode to Buzzsprout directly from Alitu.`

Do not start with:

- broad background theory
- sales language
- a long explanation of why the feature exists

### 2. Use second-person, practical voice

Default voice:

- address the reader as `you`
- use `we` only when speaking as the Alitu team
- sound calm, helpful, and product-specific
- explain only the context needed for the next decision or step

Prefer:

- `Click`
- `Select`
- `Open`
- `Go to`
- `You can`
- `If you need to`

Avoid:

- generic marketing language
- corporate phrasing
- heavy documentation voice
- filler like `comprehensive`, `seamless`, `robust`, `leverage`, `streamline`
- fake suspense or rhetorical drama

### 3. Keep one article focused on one bounded job

The strongest KB articles do one of these well:

- walk through one task
- answer one tightly scoped question
- route the reader to the right next article

Do not let one article try to be:

- a how-to
- a concept explainer
- a comparison page
- a troubleshooting tree
- and a resource hub

all at once.

### 4. Surface important limits early

If the reader needs a warning, prerequisite, scope note, or migration caveat, put it near the top.

Use a short callout for things like:

- irreversible actions
- host migration warnings
- unsupported browsers or devices
- prerequisites
- limitations outside Alitu's control

Keep the note short. One strong warning is better than several weak ones.

### 5. Use exact product language

Name the real UI surfaces, settings, buttons, and sections.

Good examples:

- `Publish page`
- `Show Distribution settings`
- `My Library`
- `Record` icon
- `Save Changes`
- `Generate chapters`

Do not write vague instructions like:

- `go to the relevant settings area`
- `change your preferences accordingly`

If quoting UI labels helps scanability, use one convention consistently within the article. Single quotes are a good default.

### 6. Keep structure easy to scan

Defaults:

- keep paragraphs to 1 to 3 sentences
- keep each step to one main action where possible
- use numbered steps for true sequences
- use bullets for options, requirements, or checks
- use headings when the topic changes

Do not add structure just for the sake of structure. Use the lightest shape that makes the article easy to follow.

### 7. Link outward instead of re-explaining everything

Keep the page narrow.

If another KB article already covers a neighboring setup flow, troubleshooting branch, or background concept, link to it instead of expanding this page into a second article.

Prefer:

- the exact KB article
- the exact in-app page when relevant
- the specific external site only when the user must leave Alitu

Use descriptive link text. Avoid `click here`.

### 8. End with a lightweight support path when needed

Many strong KB articles end with a short support CTA, but not every article needs one.

Use a support close when:

- the flow depends on a third party
- the reader may hit account-specific issues
- the topic includes troubleshooting or migration risk

Keep it short. Do not force a CTA into a page that is already complete and self-contained.

## Common Article Shapes

Choose the article shape before drafting.

### Procedural Task Article

Use for:

- setup
- publishing
- editing actions
- account actions
- troubleshooting with a fixed sequence

Default shape:

1. one-sentence intro
2. optional warning or prerequisite note
3. numbered steps
4. screenshot or GIF directly after the relevant step
5. short wrap-up
6. short support CTA if the user could still get stuck

### Explainer / FAQ

Use for:

- feature explainers
- product concepts
- short orientation questions
- tightly scoped FAQs

Default shape:

1. short framing paragraph
2. question-style H2s or clear topic headings
3. one or two short paragraphs per section
4. links to deeper how-to articles where needed
5. optional support CTA

### Workflow Router

Use only when the reader genuinely needs help choosing a path.

Default shape:

1. define the reader's situation
2. explain the main branches or stages
3. link to narrower task articles for each branch

Do not let router pages become vague catch-alls.

### Reference / UI Walkthrough

Use for:

- settings pages
- editor areas
- feature overviews tied to one screen

Default shape:

1. opening sentence introducing the area
2. H2 sections for each feature or setting group
3. short explanation for each section
4. screenshot only where it helps orientation

## Titles

Use the phrasing a user would naturally search for in chat or the Help Center.

Common title shapes:

- `How do I ...?`
- `How to ...`
- `What is ...?`
- `What's ... and where can I find it?`
- short FAQ-style questions

Good examples:

- `How do I reset my password?`
- `How to Add Chapters to your Episodes`
- `What's an RSS Feed and Where Can I Find Mine?`

Capitalization is inconsistent in the archive. For new articles, prefer one clear convention and apply it consistently.

## Openings

The first sentence should usually do one of these:

- state the outcome
- state the capability
- answer the question directly
- scope the article if the wrong reader could easily land here

Examples:

- `You can get copies of your invoices from your account dashboard.`
- `You can merge two or more files when you upload them to Alitu.`
- `This article is for podcasters starting a new show in Alitu.`

## Steps And UI References

For procedural topics:

- use ordered lists for real sequences
- keep each step focused on one main action
- separate the instruction from any extra explanation
- place visuals directly after the step they support

For UI labels:

- use the exact label from the product
- keep capitalization aligned with the UI
- quote labels when it improves clarity
- use single quotes as the default convention for UI labels
- if you quote labels, stay consistent within the article

## Headings, Lists, And Emphasis

### Headings

- use H2s for major sections
- use H3s only when a section genuinely needs sub-sections
- do not use bold text as a fake heading
- do not use H1 inside the article body

### Lists

- use ordered lists for steps
- use unordered lists for requirements, options, specs, or troubleshooting checks
- do not force numbering into content that is really descriptive

### Emphasis

- use bold sparingly for one important label, warning, or phrase
- use italics sparingly
- avoid dense or stacked emphasis

## Callouts And Media

### Callouts

Use callouts to surface:

- warnings
- prerequisites
- migration caveats
- irreversible actions
- scope notes
- short helpful tips

Match the callout style to the meaning in your authoring tool. In Intercom-style content, warning colors are a good fit for risks and prerequisites, and positive colors are a good fit for tips or confirmations. Do not rely on color alone to carry the meaning.

For draft formats:

- if the article is still in markdown or plain text, do not use markdown blockquotes as a stand-in for final Help Center styling
- instead, write a short explicit placeholder such as `Green callout in Intercom: ...` or `Red callout in Intercom: ...`
- when producing final paste-ready body copy, remove the placeholder wrapper and leave only the callout text that should go into the Intercom block

### Media

- use screenshots and GIFs when the user must find something on screen
- place the image directly after the relevant step
- avoid decorative media
- do not use video-only pages as the default model for future articles

## Closings

Good closings are short.

Common patterns:

- a brief completion line such as `That's it!`
- one sentence confirming the result
- a short support CTA when the user could plausibly still get stuck

Examples:

- `That's it! Your episode will be sent to Buzzsprout.`
- `Please reach out using the chat box at the bottom of this page if you have any questions about using Alitu. We're happy to help!`

Do not end with a long summary paragraph that repeats the whole article.

## What Not To Imitate

Do not copy these legacy or draft patterns into new articles:

- wrapper pages with almost no written guidance
- H1s used as section headings
- broken numbering or manually typed step numbers
- raw URLs in body copy
- vague link text like `here`
- typo-heavy copy
- empty HTML artifacts
- broad pages that try to cover too many different flows
- sales-led or promotional voice
- generic AI phrasing
- excessive emoji, exclamation marks, or filler

## Fast Prompt Insert

Use this block when asking an LLM to draft a new Alitu KB article:

```text
Write an Alitu Help Center article in the established house style.

Requirements:
- Write for a user who wants a direct answer fast.
- Use second-person voice and plain English.
- Start with a short opening that states the task, answer, or outcome.
- Surface any important warning, prerequisite, limitation, or migration caveat near the top.
- Keep the article focused on one bounded task or question.
- For procedural topics, use numbered steps with exact UI labels in single quotes.
- Keep paragraphs short and easy to scan.
- Use screenshots or GIFs only where they genuinely help.
- Link to adjacent KB articles instead of re-explaining related topics.
- End with the standard support CTA when the topic could realistically leave the user stuck:
  `Please reach out using the chat box at the bottom of this page if you have any questions about using Alitu. We're happy to help!`
- For Intercom callouts, use explicit `Green callout in Intercom:` or `Red callout in Intercom:` placeholders in drafts, not markdown blockquotes.
- If asked for final paste-ready body copy, remove draft-only placeholders and editor notes.

Style guardrails:
- Sound helpful, calm, and product-specific.
- Avoid corporate tone, filler, hype, and generic AI phrasing.
- Do not over-explain background theory if the user mainly needs actions.
- Do not imitate typos, broken formatting, or noisy legacy patterns from older articles.
```

## Review Checklist

Before publishing, check:

- Does the title match how a user would search for this?
- Does the opening tell the reader what they can do or learn here?
- Are the article's scope and audience clear?
- Are warnings or limitations surfaced early enough?
- Are the steps concrete enough to follow without guessing?
- Are UI labels accurate?
- Are UI labels quoted consistently with single quotes where needed?
- Are callouts represented in an Intercom-friendly way rather than as markdown blockquotes?
- Are screenshots only used where they genuinely help?
- Does the article stay focused on one bounded job?
- Did the article link out instead of duplicating nearby KB content?
- If the user gets stuck, is there a simple support path?
- If this is final paste-ready copy, did you remove editor notes, asset-placement notes, and draft-only wrappers?
