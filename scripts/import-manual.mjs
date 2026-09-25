// 一次性迁移：主仓库 docs/manual 章节 → 本站 src/content/docs（英文 slug 路由）
// 口径同源：正文原样迁移，仅改写图片路径与章节内链；不新增、不改写任何事实。
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'D:/wample/coding/me/apo-once-glance/docs/manual';
const DEST = 'src/content/docs';

// 文件名 → { slug, order, title, desc }（desc 取自手册 README 目录表，口径同源）
const CHAPTERS = [
  ['01-认识定影.md', 'intro', 1, '认识定影', '定影是什么、六大热键、主面板导览'],
  ['02-第一张截图.md', 'first-screenshot', 2, '第一张截图', '取景层、窗口自动识别、放大镜取色'],
  ['03-给截图加标注.md', 'annotate', 3, '给截图加标注', '箭头/序号/马赛克/文字，画完随时改'],
  ['04-长截图.md', 'scrolling', 4, '长截图', '聊天记录、长网页一图打包'],
  ['05-贴图.md', 'pin', 5, '贴图', '把截图钉在屏幕上随取随用'],
  ['06-历史与取字.md', 'history-ocr', 6, '历史与取字', '截图自动入库、搜索语法、OCR 取字'],
  ['07-主面板与设置.md', 'settings', 7, '主面板与设置', '五个页面各管什么、常用开关'],
  ['08-接入AI-Agent.md', 'agent', 8, '接入 AI Agent', '让 Claude / WorkBuddy / Cursor 替你截图取字'],
  ['09-让AI替你写教程.md', 'ai-tutorial', 9, '让 AI 替你写教程', '一句话产出带标注的教程图'],
  ['附录.md', 'appendix', 10, '附录', '快捷键总表、CLI/MCP 速查、主题参数、常见问题'],
];

const slugOf = Object.fromEntries(CHAPTERS.map(([f, slug]) => [f, slug]));

function rewriteLinks(md) {
  // ./images/xx.png 或 images/xx.png → /manual/images/xx.png
  md = md.replace(/\((?:\.\/)?images\//g, '(/manual/images/');
  // 章节内链（./NN-xxx.md 或裸 NN-xxx.md，可带 #锚点）→ /docs/<slug><锚点>（无尾斜杠，与 trailingSlash: never 一致）
  md = md.replace(/\((?:\.\/)?(\d{2}-[^)#]+?|附录)\.md(#[^)]*)?\)/g, (_, name, anchor) => {
    const key = Object.keys(slugOf).find((f) => f === `${name}.md`);
    return key ? `(/docs/${slugOf[key]}${anchor ?? ''})` : _;
  });
  // 主仓库 README 链接 → GitHub 仓库页
  md = md.replace(/\(\.\.\/\.\.\/README\.md\)/g, '(https://github.com/wample0105/apo-once-glance#readme)');
  return md;
}

mkdirSync(DEST, { recursive: true });
for (const [file, slug, order, title, desc] of CHAPTERS) {
  let md = readFileSync(join(SRC, file), 'utf8');
  // 去掉正文首行 H1（标题进 frontmatter，由 DocLayout 渲染，避免重复）
  md = md.replace(/^#\s+.+\r?\n/, '');
  md = rewriteLinks(md);
  const front = `---\ntitle: ${title}\ndescription: ${desc}\norder: ${order}\n---\n\n`;
  writeFileSync(join(DEST, `${slug}.md`), front + md.trim() + '\n');
  console.log(`ok ${file} -> ${slug}.md`);
}
console.log('done.');
