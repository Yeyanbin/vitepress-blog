import { defineConfig } from 'vitepress'
import { nav } from './utils/nav'
import { sidebar } from './utils/sidebar'
import { mdPlugin } from './config/plugins'

/**
 * 更多配置项参考：https://vitepress.vuejs.org/config/app-configs.html
 */

const config = defineConfig({
  base: 'yubi-blog',
  title: 'Yubi',
  lastUpdated: true,

  themeConfig: {
    lastUpdatedText: '23-02-24',
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Yeyanbin'
      }
    ],
    nav,
    sidebar
  },
  markdown: {
    config: (md) => mdPlugin(md)
  }
})

export default config
