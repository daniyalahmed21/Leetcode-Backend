const { marked } = require("marked");
const sanitize = require("sanitize-html");
const TurndownService = require("turndown");

/**
 * Cleans potentially unsafe Markdown by converting to HTML,
 * sanitizing it, and converting back to safe Markdown.
 *
 * @param {string} rawMarkdown - Raw markdown input
 * @returns {string} - Clean and safe markdown output
 */

function cleanMarkdown(rawMarkdown) {
  const turndown = new TurndownService();

  // Step 1: Convert markdown to HTML
  const html = marked(rawMarkdown);

  // Step 2: Sanitize HTML to remove unsafe tags (like <script>)
  const cleanHtml = sanitize(html, {
    allowedTags: sanitize.defaults.allowedTags.concat(["img"]),
  });

  // Step 3: Convert sanitized HTML back to markdown
  const safeMarkdown = turndown.turndown(cleanHtml);

  return safeMarkdown;
}

module.exports = {cleanMarkdown};
