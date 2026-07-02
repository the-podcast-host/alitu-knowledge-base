#!/usr/bin/env node
// Render-equivalence normaliser for KB sync body comparison.
//
// Purpose: local article files are stored prettier-formatted (readable), while Intercom stores
// minified HTML. Two bodies that RENDER identically must compare equal, so that cosmetic
// formatting never shows up as a false "changed article". Genuine content edits still differ.
//
// Usage:
//   node normalise-body.js <file.html>          # extracts <body>..</body>, prints normalised form
//   node normalise-body.js --raw <fragment.txt> # treats whole file as a body fragment
//   node normalise-body.js --compare <local.html> <intercom-body.txt>
//                                               # prints MATCH or DIFFER (+ first divergence)
//
// Typical sync use: write the Intercom body (from get_article) to a temp file, then run
// `--compare` against the local article file. Exit code 0 = match, 1 = differ.

const fs = require('fs');

// Block/structural tags where leading/trailing inner whitespace is insignificant in HTML.
const BLOCK = 'p|div|h[1-6]|ul|ol|li|body|blockquote|section|article|header|footer|nav|figure|figcaption|table|thead|tbody|tfoot|tr|td|th|dl|dt|dd|pre';

function stripIntercomCdnParams(s) {
  // Strip only the transient query params Intercom appends to its own CDN asset URLs
  // (?expires=...&signature=...&req=...). Leave stable S3 URLs and their params untouched.
  return s.replace(/(https?:\/\/downloads\.intercomcdn\.com\/[^"'\s)]+?)\?[^"'\s)]*/g, '$1');
}

function normalise(html) {
  let s = html;
  s = stripIntercomCdnParams(s);
  // Normalise inline style attributes: trim each declaration, drop empties. Handles prettier
  // stripping the trailing ';' and any inter-declaration spacing differences.
  s = s.replace(/style="([^"]*)"/gi, (m, v) =>
    'style="' + v.split(';').map(d => d.trim().replace(/\s*:\s*/, ': ')).filter(Boolean).join('; ') + '"');
  // Normalise self-closing/void tags: <br /> or <br/> -> <br>
  s = s.replace(/\s*\/\s*>/g, '>');
  // Collapse all whitespace (newlines, tabs, spaces, zero-width space, BOM) to a single space.
  s = s.replace(/[\s​﻿]+/g, ' ');
  // Remove whitespace immediately after < or </
  s = s.replace(/<\s+/g, '<').replace(/<\/\s+/g, '</');
  // Remove whitespace immediately before > (handles prettier's `<b\n  >` pattern)
  s = s.replace(/\s+>/g, '>');
  // Trim whitespace at the start/end of block-element content (prettier indents text onto its own
  // line; HTML collapses that away). Deliberately does NOT touch inline boundaries like `</a> text`.
  const openBlock = new RegExp('(<(?:' + BLOCK + ')\\b[^>]*>) ', 'gi');
  const closeBlock = new RegExp(' (</(?:' + BLOCK + ')>)', 'gi');
  let p;
  do { p = s; s = s.replace(openBlock, '$1').replace(closeBlock, '$1'); } while (s !== p);
  // Collapse whitespace between adjacent tags (prettier inserts newlines between block tags).
  do { p = s; s = s.replace(/>\s+</g, '><'); } while (s !== p);
  return s.trim();
}

function bodyOf(html) {
  const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return m ? m[1] : html; // if no <body>, treat input as a fragment
}

module.exports = { normalise, bodyOf };

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args[0] === '--compare') {
    const local = normalise(bodyOf(fs.readFileSync(args[1], 'utf8')));
    const intercom = normalise(bodyOf(fs.readFileSync(args[2], 'utf8')));
    if (local === intercom) { console.log('MATCH'); process.exit(0); }
    let i = 0; while (i < local.length && i < intercom.length && local[i] === intercom[i]) i++;
    console.log('DIFFER at char ' + i);
    console.log('LOCAL   : ' + JSON.stringify(local.slice(Math.max(0, i - 40), i + 60)));
    console.log('INTERCOM: ' + JSON.stringify(intercom.slice(Math.max(0, i - 40), i + 60)));
    process.exit(1);
  }
  const raw = args[0] === '--raw';
  const file = raw ? args[1] : args[0];
  const input = fs.readFileSync(file, 'utf8');
  console.log(normalise(raw ? input : bodyOf(input)));
}
