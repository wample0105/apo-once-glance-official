// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://onceglance.weipo.top',
  trailingSlash: 'never',
  integrations: [sitemap()],
  // 预留双语：默认中文挂根路径，英文预留 /en 前缀（首发不建英文页）
  i18n: {
    locales: ['zh-CN', 'en'],
    defaultLocale: 'zh-CN',
    prefixDefaultLocale: false,
  },
});
