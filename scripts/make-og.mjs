// 生成 OG 分享图（1200×630）：暗色取景底 + 红色选框四角手柄 + 品牌 lockup
// 视觉语言复刻产品框选覆盖层（ui-design.md 5.3），与官网首屏一致
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const W = 1200;
const H = 630;
const FRAME = { x: 70, y: 96, w: 1060, h: 438 };

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#141416"/>

  <!-- 选框 -->
  <rect x="${FRAME.x}" y="${FRAME.y}" width="${FRAME.w}" height="${FRAME.h}"
        fill="none" stroke="#FF3B30" stroke-width="3"/>

  <!-- 四角手柄 -->
  ${[
    [FRAME.x - 8, FRAME.y - 8],
    [FRAME.x + FRAME.w - 8, FRAME.y - 8],
    [FRAME.x - 8, FRAME.y + FRAME.h - 8],
    [FRAME.x + FRAME.w - 8, FRAME.y + FRAME.h - 8],
  ]
    .map(
      ([hx, hy]) =>
        `<rect x="${hx}" y="${hy}" width="16" height="16" fill="#FFFFFF" stroke="#FF3B30" stroke-width="3"/>`
    )
    .join('\n  ')}

  <!-- 尺寸牌（选框上方） -->
  <rect x="${FRAME.x + 24}" y="${FRAME.y - 44}" width="120" height="30" rx="6" fill="#1D1D21" stroke="rgba(255,255,255,0.13)"/>
  <text x="${FRAME.x + 84}" y="${FRAME.y - 23}" text-anchor="middle" fill="rgba(245,245,247,0.62)"
        font-family="Consolas, 'Cascadia Code', monospace" font-size="16">1200 × 630</text>

  <!-- 动作条（选框下方） -->
  <rect x="${W / 2 - 190}" y="${FRAME.y + FRAME.h + 26}" width="380" height="46" rx="10" fill="#1D1D21" stroke="rgba(255,255,255,0.13)"/>
  <rect x="${W / 2 - 174}" y="${FRAME.y + FRAME.h + 34}" width="76" height="30" rx="7" fill="#FF3B30"/>
  <text x="${W / 2 - 136}" y="${FRAME.y + FRAME.h + 54}" text-anchor="middle" fill="#FFFFFF"
        font-family="'Microsoft YaHei', sans-serif" font-size="15">复制</text>
  <text x="${W / 2 - 62}" y="${FRAME.y + FRAME.h + 54}" text-anchor="middle" fill="#F5F5F7"
        font-family="'Microsoft YaHei', sans-serif" font-size="15">取字</text>
  <text x="${W / 2 + 16}" y="${FRAME.y + FRAME.h + 54}" text-anchor="middle" fill="#F5F5F7"
        font-family="'Microsoft YaHei', sans-serif" font-size="15">标注</text>
  <text x="${W / 2 + 94}" y="${FRAME.y + FRAME.h + 54}" text-anchor="middle" fill="#F5F5F7"
        font-family="'Microsoft YaHei', sans-serif" font-size="15">长截图</text>

  <!-- 品牌 lockup -->
  <text x="${W / 2 - 96}" y="80" text-anchor="middle" fill="#F5F5F7"
        font-family="'Microsoft YaHei', 'Segoe UI', sans-serif" font-weight="700" font-size="40">定影</text>
  <text x="${W / 2 + 62}" y="80" text-anchor="middle" fill="rgba(245,245,247,0.62)"
        font-family="'Segoe UI', sans-serif" font-weight="600" font-size="26">OnceGlance</text>
</svg>`;

mkdirSync('public', { recursive: true });
await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('og.png generated.');
