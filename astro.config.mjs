// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO(部署前更新): 绑定正式域名后替换 site，并考虑 robots.txt 补 Sitemap 行
export default defineConfig({
  site: 'https://onceglance.example.com',
  trailingSlash: 'never',
  integrations: [sitemap()],
  // 预留双语：默认中文挂根路径，英文预留 /en 前缀（首发不建英文页）
  i18n: {
    locales: ['zh-CN', 'en'],
    defaultLocale: 'zh-CN',
    prefixDefaultLocale: false,
  },
});
