#!/usr/bin/env node

const http = require("http");
const fs = require("fs");
const path = require("path");

const ARTICLES_DIR =
  process.argv[2] || path.resolve(__dirname, "../../../articles");
const PORT = parseInt(process.argv[3] || "4100", 10);

function parseArticle(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");

  const metaMatch = raw.match(/<!--\s*([\s\S]*?)-->/);
  const meta = {};
  if (metaMatch) {
    for (const line of metaMatch[1].split("\n")) {
      const m = line.match(/^(\w[\w_]*):\s*(.*)/);
      if (m) meta[m[1]] = m[2].trim();
    }
  }

  const bodyMatch = raw.match(/<body>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : "";

  return { meta, body, slug: path.basename(filePath, ".html") };
}

function loadArticles() {
  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".html"))
    .sort();
  return files.map((f) => parseArticle(path.join(ARTICLES_DIR, f)));
}

const STYLE = `
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { height: 100%; }
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1a1a1a; display: flex; }

nav {
  width: 280px;
  min-width: 280px;
  height: 100vh;
  overflow-y: auto;
  background: #f5f3ef;
  border-right: 1px solid #ddd;
  padding: 16px 0;
  position: sticky;
  top: 0;
}
nav h1 { font-size: 15px; padding: 0 16px 12px; color: #555; font-weight: 600; letter-spacing: 0.02em; }
nav .filter { padding: 0 12px 12px; }
nav .filter input {
  width: 100%; padding: 6px 10px; border: 1px solid #ccc; border-radius: 4px;
  font-size: 13px; font-family: inherit;
}
nav a {
  display: block; padding: 5px 16px; font-size: 13px; color: #333;
  text-decoration: none; line-height: 1.4;
}
nav a:hover { background: #eae7e1; }
nav a.active { background: #ddd8d0; font-weight: 600; }
nav .state-draft { opacity: 0.5; font-style: italic; }

main {
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  padding: 40px 48px;
  max-width: 800px;
}
main h1 { font-size: 28px; margin-bottom: 8px; line-height: 1.3; }
main .meta { font-size: 13px; color: #777; margin-bottom: 28px; line-height: 1.8; }
main .meta .label { color: #999; }

.article-body h1 { font-size: 24px; margin: 28px 0 12px; }
.article-body h2 { font-size: 20px; margin: 24px 0 10px; }
.article-body h3 { font-size: 17px; margin: 20px 0 8px; }
.article-body p { margin: 8px 0; line-height: 1.65; }
.article-body ul, .article-body ol { margin: 8px 0 8px 24px; }
.article-body li { margin: 4px 0; line-height: 1.6; }
.article-body a { color: #1a6daa; }
.article-body img { max-width: 100%; height: auto; border-radius: 4px; margin: 8px 0; }
.article-body .intercom-container { margin: 12px 0; }
.article-body .intercom-interblocks-callout {
  padding: 14px 16px; border-radius: 6px; border-left: 4px solid;
  margin: 14px 0;
}
.article-body b { font-weight: 700; }

.empty { color: #999; margin-top: 120px; text-align: center; font-size: 16px; }
`;

function navHtml(articles, activeSlug) {
  const items = articles
    .map((a) => {
      const cls = [];
      if (a.slug === activeSlug) cls.push("active");
      if (a.meta.state === "draft") cls.push("state-draft");
      const title = a.meta.title || a.slug;
      return `<a href="/${a.slug}" class="${cls.join(" ")}" data-title="${title.toLowerCase()}">${title}</a>`;
    })
    .join("\n");

  return `
<nav>
  <h1>Alitu Knowledge Base</h1>
  <div class="filter"><input type="text" id="filter" placeholder="Filter articles..." autofocus></div>
  <div id="nav-links">${items}</div>
</nav>`;
}

const FILTER_SCRIPT = `
<script>
document.getElementById('filter').addEventListener('input', function() {
  const q = this.value.toLowerCase();
  document.querySelectorAll('#nav-links a').forEach(function(a) {
    a.style.display = a.dataset.title.includes(q) ? '' : 'none';
  });
});
</script>`;

function formatDate(ts) {
  if (!ts) return "";
  const d = new Date(parseInt(ts) * 1000);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function articlePage(articles, article) {
  const meta = article.meta;
  const lines = [];
  lines.push(`<span class="label">status:</span> ${meta.state || "unknown"}`);
  if (meta.updated_at) lines.push(`<span class="label">updated:</span> ${formatDate(meta.updated_at)}`);
  if (meta.created_at) lines.push(`<span class="label">created:</span> ${formatDate(meta.created_at)}`);
  if (meta.description) lines.push(`<span class="label">description:</span> ${meta.description}`);
  if (meta.id) lines.push(`<span class="label">id:</span> ${meta.id}`);

  return `<!DOCTYPE html><html><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${meta.title || article.slug} — KB Preview</title>
<style>${STYLE}</style>
</head><body>
${navHtml(articles, article.slug)}
<main>
  <h1>${meta.title || article.slug}</h1>
  <div class="meta">${lines.join("<br>")}</div>
  <div class="article-body">${article.body}</div>
</main>
${FILTER_SCRIPT}
</body></html>`;
}

function indexPage(articles) {
  return `<!DOCTYPE html><html><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>KB Preview</title>
<style>${STYLE}</style>
</head><body>
${navHtml(articles, null)}
<main><p class="empty">Select an article from the sidebar.</p></main>
${FILTER_SCRIPT}
</body></html>`;
}

const server = http.createServer((req, res) => {
  const articles = loadArticles();
  const slug = req.url.replace(/^\//, "").replace(/\/$/, "");

  if (!slug) {
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(indexPage(articles));
  }

  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("Not found");
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(articlePage(articles, article));
});

server.listen(PORT, () => {
  console.log(`KB preview running at http://localhost:${PORT}`);
  console.log(`Serving articles from ${ARTICLES_DIR}`);
  console.log("Press Ctrl+C to stop.");
});
