<template>
  <f-main>
    <f-text align="center" line-height="70px" bold block size="25px">
      Hello，这是Yubi的博客，毛坯版本。
    </f-text>

    <f-text align="center">
      <f-button round type="primary" class="start" style="margin-right: 16px;" href="/yubi-blog/docs/杂/hello.html">
        😊 快速开始
      </f-button>
      <f-button round href="https://github.com/Yeyanbin/vitepress-blog" target="_blank">
        Github
      </f-button>
    </f-text>

    <f-divider margin="40px" color="#eef" />
    <div class="demo-wrap">
      <f-text class="demo-show">
        <span>项目展示</span>
        <span class="demo-name">Yubi web-os</span>
        <a href="https://yeyanbin.github.io/mac-dialog-demo/dist/" target="_blank" style="font-size: 12px;"> > 点击体验 </a>
      </f-text>
      <f-text>💪 窗口化的web设计，类操作系统式体验</f-text>
      <f-text>🐆 微前端方式部署应用，展示个人项目</f-text>
      <f-text>📌 会不断更新app（希望能部署一下大家的博客）</f-text>
    </div>


    <!--<f-text bold block>欢迎使用</f-text>
    <f-text block>⚡ 欢迎使用 vitePress-template</f-text>
    <f-text block>🌲 在这里编写你的博客吧</f-text>
    <f-text block>
      🔨 官方文档在
      <f-link href="https://vitepress.vuejs.org" type="primary"> 这里 </f-link>
    </f-text>

    <f-divider margin="40px" color="#eef" />

    <f-text bold block>特性</f-text>
    <f-text>📌 开箱即用</f-text>
    <f-text>
      🚀 和
      <f-link href="https://github.com/FightingDesign/fighting-design" type="primary">
        fighting-design
      </f-link>
      完美结合
    </f-text>
    <f-text>💪 使用 Vue.js 最新特性开发</f-text>
    <f-text>🐆 全面基于 Vite，速度够快</f-text>
    <f-text>🖍️ markdown 中直接使用 vue 组件</f-text>
    <f-text>✔️ 配置简单，上手容易</f-text>
    <f-text>🚩 markdown 中直接使用 setup 语法糖</f-text>
    <f-text>📃 第三方组件库支持</f-text> -->
  </f-main>
</template>

<script lang="ts" setup>
  // code……
</script>

<style scoped>
.f-main {
  max-width: 620px;
  margin: 40px auto;
  box-sizing: border-box;
  padding: 40px;
  padding-bottom: 0;
  flex-direction: column;
  align-items: center;
  display: flex;
}

.f-button-default {
  margin-left: 10px;
}

.f-text {
  display: block;
  line-height: 40px;
}


.demo-show {
  display: flex;
  align-items: center;
}

.demo-name {
  font-size: 20px;
  margin: 0 10px 0 20px;
  background: whitesmoke;
  padding: 5px 15px;
  border: 4px solid var(--f-design-color-primary-1);
  border-radius: 25px;
}
</style>
