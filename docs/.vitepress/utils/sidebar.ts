/**
 * 侧边栏模块
 * 
 * 详情参考：https://vitepress.vuejs.org/guide/theme-sidebar
 */
export const sidebar = {
  '/docs/': [
    {
      text: '游戏相关',
      collapsible: true,
      link: '/docs/game',
      items: [
        { text: '游戏弹道设计和碰撞优化方法', link: '/docs/游戏初探与碰撞检测/游戏弹道设计和碰撞优化方法.md' },
      ]
    },
    {
      text: 'css&html',
      collapsible: true,
      link: '/docs/cssAndHtml',
      items: [
        { text: '0.css动画之transition', link: '/docs/css&html/0.css动画之transition.md' },
        { text: '1.css动画之animation', link: '/docs/css&html/1.css动画之animation.md' },
        { text: '2.css选择器和函数', link: '/docs/css&html/2.css选择器和函数.md' },
        { text: '3.浏览器是如何执行JS', link: '/docs/css&html/3.浏览器是如何执行JS.md' },
      ]
    },
    {
      text: '设计模式相关',
      collapsible: true,
      link: '/docs/design',
      items: [
        { text: '领域驱动设计初探', link: '/docs/设计模式相关/领域驱动设计_DDD/初步接触.md' },
        { text: '领域驱动设计——充血模型', link: '/docs/设计模式相关/领域驱动设计_DDD/充血模型.md' },
        { text: '领域驱动设计——权限模块架构设计', link: '/docs/设计模式相关/领域驱动设计_DDD/权限/大概设计.md' },
      ]
    },
    {
      text: 'JavaScirpt',
      collapsible: true,
      link: '/docs/javascirpt',
      items: [
        { text: '配置化&低代码', link: '/docs/JavaScirpt/配置化&低代码/readme.md', 
          collapsible: true,
          items: [
            {
              text: '逆波兰表达式详解',
              link: '/docs/JavaScirpt/配置化&低代码/逆波兰表达式.md', 
            },
            {
              text: '设计配置化——Schema属性处理提案',
              link: '/docs/JavaScirpt/配置化&低代码/Schema构造.md', 
            }
          ]
        },
        { text: '装饰器详解与实践', link: '/docs/JavaScirpt/装饰器/decorator/装饰器介绍.md' },
        { text: '单元测试相关', link: '/docs/readme.md', 
          items: [
            {
              text: 'Jest——匹配器的使用',
              link: '/docs/JavaScirpt/jest/匹配器的使用.md', 
            },
            {
              text: 'Jest——使用jest测试异步函数',
              link: '/docs/JavaScirpt/jest/使用jest测试异步函数.md', 
            }
          ] 
        },
        { text: '3.浏览器是如何执行JS', link: '/docs/css&html/3.浏览器是如何执行JS.md' },
        {
          text: '杂',
          collapsible: true,
          link: '/docs/other',
          items: [
            { text: 'debug和问问题指南', link: '/docs/杂/debug和问问题指南.md' },
            { text: 'hello', link: '/docs/杂/hello.md' },
          ]
        },
      ]
    },
    {
      text: 'Node',
      collapsible: true,
      link: '/docs/node',
      items: [
        { text: '文件系统初探', link: '/docs/Node/fs/文件系统初探.md' },
      ]
    },
    {
      text: '工具库',
      collapsible: true,
      link: '/docs/node',
      items: [
        { text: 'echarts轻度封装使用', link: '/docs/工具库/echarts/echarts.md' },
      ]
    },
  ]
}
