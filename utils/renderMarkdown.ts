import MarkdownIt from "markdown-it";
// @ts-ignore
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const codeHighLight = (value: string) =>
  '<pre class="hljs"><code>' + value + "</code></pre>";

export const renderMarkdown = (content: string) => {
  const markdownIt = new MarkdownIt({
    html: true,
    highlight: function (str, lang) {
      if (!lang || !hljs.getLanguage(lang)) return codeHighLight(str);
      try {
        const value = hljs.highlight(str, {
          language: lang,
          ignoreIllegals: true,
        }).value;
        return codeHighLight(value);
      } catch (err) {
        console.log(err);
      }
      return codeHighLight(str);
    },
  });
  return markdownIt.render(content);
};
