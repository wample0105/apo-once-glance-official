# 定影（OnceGlance）官网 · 交接日志

> 本仓库为定影官方官网（apo-once-glance-official），独立于主项目仓库 `D:\wample\coding\me\apo-once-glance`。
> 主项目素材来源：README.md（口径门面）、docs/manual/（九章教程 + 附录）、assets/（logo 与二维码）、docs/ui-design.md（设计令牌 v1.2）。

---

## 2026-09-25 · 需求澄清与决策裁定（官网立项）

### 用户需求

为定影（OnceGlance，AI 原生 Windows 截图工具，v0.1.1 已发布）开发官方官网。当前对外门面只有 GitHub README，需要正式官网解决三件事：

1. **转化**：访客 3 秒明白定影是什么（尤其国内非开发者用户）；
2. **分发**：30 秒完成下载安装（客户端 + CLI + MCP 接入）；
3. **信任与上手**：讲透「AI 原生 / 本地三零 / 隐私防线」差异化，并承载官方教程。

受众两层：普通截图用户（下载、教程）与 Agent 用户/开发者（MCP/CLI/Skill，差异化主线）。

### 歧义确认（用户逐题选择题裁定，全部采纳推荐项）

| # | 决策点 | 裁定 |
|---|--------|------|
| 1 | 网站范围 | **落地页 + 文档站**：营销首页 + 将 docs/manual 九章教程纳入官网统一导航 |
| 2 | 技术栈 | **Astro**，纯静态输出 |
| 3 | 部署托管 | **Cloudflare Pages**（免费全球 CDN、绑自定义域名、无需备案；产物纯静态可随时迁国内 CDN） |
| 4 | 站点语言 | **首发纯中文**，路由与内容结构预留 /en 双语扩展位 |
| 5 | 视觉主题 | **亮色为主 · 品牌令牌**：白/浅灰工作台 + 定影红 #FF3B30 只做点睛，首屏局部「暗色取景层」元素呼应截图瞬间 |
| 6 | 下载链接 | **GitHub Releases 直链**（含 install.sh 一键脚本），与 README 口径完全一致 |
| 7 |（开发中途追加）| **导航右上角 GitHub logo 入口**，点击跳转仓库（业界标准做法，已实现） |

### 开发铁律（沿用主项目既有约定）

- **口径同源**：官网文案与 README / docs/manual 一套说法，不新造事实；缺失处标注待确认。
- **品牌视觉**：延用 ui-design.md v1.2 设计令牌（红 #FF3B30 点睛、亮工作台/暗取景、安静克制）。
- **零追踪**：官网自身不放任何追踪脚本，与产品「零遥测」基调一致。
- **如实表达**：产品当前仅 Windows 版（Windows 优先）。
- git 仅本地提交；**推送远程 / 部署上线必须先经用户同意**。

---

## 2026-09-25 · 官网 v1 开发完成（已本地提交，未推送）

### 技术实现

- **栈**：Astro 5 静态输出 + @astrojs/sitemap + sharp（OG 图生成）；Node 24 / npm 11。
- **结构**：
  - `/` 首页：Hero（取景层视觉：暗色面板 + 红选框 + 四角手柄 + 尺寸牌 + 动作条，复刻 ui-design.md 5.3 框选覆盖层）→ 三分钟上手（红色序号 = 产品标注序号语言）→ 核心功能 bento 网格（2 宽 + 3 窄 + 1 通栏）→ Agent 暗色区（三端同源/不依赖常驻/主题继承 + 终端示例 + MCP 工具 chips + 退出码说明）→ 隐私防线（三零 chips + 四道防线清单）→ FAQ（README 四条，details/summary 原生交互）→ 关注与交流（三二维码）。
  - `/download`：客户端（Releases 直链、解压即用、WebView2 要求）→ CLI/Skill 一键脚本（SHA-256 校验、~/.onceglance/bin、Skill 需 v0.1.2+）→ MCP 一键接入（客户端 chips + 自动备份说明）→ 安装验证 `once status --json` → 卸载。
  - `/docs`：教程总览（AI 产出声明引用块、三分钟快速开始、目录卡、阅读路径）+ 九章 + 附录（`/docs/<slug>` 英文 slug 路由，侧边栏 + 上一章/下一章）。
  - `/404`：暗取景风格 404。
- **内容迁移**：`scripts/import-manual.mjs` 从主仓库 docs/manual 迁移十章 Markdown：注入 frontmatter（title/description/order）、剥正文 H1、图片路径改 `/manual/images/`、章节内链改 `/docs/<slug>#锚点`（无尾斜杠）、主仓库 README 链接改 GitHub。**正文一字未改（口径同源）**。
- **品牌**：设计令牌全部落在 `src/styles/global.css` CSS 变量；Header/Footer 用 appicon-512 影章；导航右上角 GitHub octicon 图标（用户中途追加的需求）+ 下载按钮；页脚含仓库 pill、三列链接、MIT 与「本站不含任何追踪脚本」声明。
- **SEO**：每页 title/description/canonical/OG/Twitter 卡片；首页 JSON-LD SoftwareApplication；sitemap-index + robots.txt（域名暂为 `onceglance.example.com` 占位，**部署前需替换**，位置：astro.config.mjs 与 public/robots.txt）；`scripts/make-og.mjs` 用 sharp 生成 1200×630 取景层风格 OG 图（npm run og）。

### 验收记录（浏览器多视口截图）

- 桌面 1440×900：首屏/功能区/暗色 Agent 区/隐私/FAQ/二维码/页脚逐屏通过；文档索引、章节页（侧边栏高亮、表格键帽、配图）、附录锚点跳转（`/docs/appendix#a-快捷键总表`）通过；下载页 5 区块通过。
- 移动 390×844：首页与文档页无横向溢出；侧边栏折叠为胶囊行；安装命令条全宽省略显示。
- **过程中发现并修复 4 个问题**：
  1. `mark-256.png` 影章只占画布左上角 → Header/Footer 改用 `appicon-512.png`；
  2. 全站内链带尾斜杠与 `trailingSlash: 'never'` 冲突（preview 404）→ 统一改无尾斜杠（与 Cloudflare Pages 规范化方向一致）；
  3. 首页终端示例 JSON 花括号被 Astro 模板当表达式 → 改前置字符串 + set:html，并缩短行宽消除横向滚动条；
  4. 移动端安装命令条溢出 → hero-cta 纵向堆叠 + chip 全宽。
- 素材勘误：manual 的 `03-demo.png` 实际内容是历史搜索页（非标注成品），首页「专业标注」改用 `03-editor.png`，「历史与检索」区使用搜索语法 chips 呈现。**此为素材本身的历史问题，教程正文未动**，如需可在主项目侧修正。

### 当前状态与未完成事项

- **状态**：官网 v1 全部页面开发完成、构建通过、多视口验收通过；已在本地 git 提交（`f43d715`，分支 main）。
- **远程仓库（2026-09-25 经用户授权后创建并推送）**：https://github.com/wample0105/apo-once-glance-official （public，main 分支，gh CLI 操作）。
- **正式域名（2026-09-25 用户提供）**：`https://onceglance.weipo.top`，已替换 astro.config.mjs 的 site 与 public/robots.txt 的 Sitemap 行，重新构建后 sitemap/canonical/OG 均已生效。
- **未完成**：无（官网已上线）。
- **上线记录（2026-09-25）**：用户经 Cloudflare 仪表盘自行完成部署（新版控制台默认引导 Workers 静态资产路径，Pages 入口较深；用户最终找到 Pages 并部署），自定义域名 `onceglance.weipo.top` 绑定成功。线上验收通过：全部页面 200、404 返回自定义页、HTTP→HTTPS 301 正常、sitemap/robots/OG 图可达、桌面端首页与文档章节页渲染正常。
- **注意事项**：若同一仓库同时存在 Workers 与 Pages 两个项目，需只保留一个绑定 `onceglance.weipo.top`，另一个删除或解绑，避免 DNS 与自动构建混乱。
- **待办（部署前）**：
  1. 确定正式域名 → 替换 `astro.config.mjs` 的 `site` 与 `public/robots.txt` 的 Sitemap 行（两处有 TODO 注释）→ 重新 `npm run build`；
  2. 推送 GitHub 仓库并接 Cloudflare Pages（构建命令 `npm run build`，输出目录 `dist`）；
  3. （可选）主项目侧修正 03-demo.png 素材内容后重跑 `node scripts/import-manual.mjs` 同步；
  4. （可选）英文站：i18n 配置已预留 `/en`，填充内容即可。
- **本地预览**：`npm run dev`（开发）或 `npm run build && npm run preview`（产物预览，默认 http://localhost:4321）。
