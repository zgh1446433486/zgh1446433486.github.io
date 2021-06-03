const { fs, path } = require("@vuepress/shared-utils");
const process = require('process');

module.exports = (ctx) => ({
  title: "前端知识记录",
  dest: './dist',
  description: "Surprise! I'm back!",
  theme: "@vuepress/theme-default",
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    repo: "vuejs/vuepress",
    repoLabel: '查看源码',
    editLinks: true,
    editLinkText: '帮助我们改善此页面！',
    smoothScroll: true,
    editLinks: true,
    nav: [
      { text: "前端随笔", link: "/essay/" },
      { text: "前端框架", link: "/frame/" },
      { text: "前端算法", link: "/algorithm/" },
      { text: "代码块", link: "/code/" },
    ],
    sidebar: {
      "/essay/": [
        {
          title: "前端随笔",
          collapsable: false,
          children: [["", "介绍"], "gitSummary", "MarkdownCode", "arrayApi"],
        },
      ],
      "/frame/": [
        {
          title: "Vue",
          collapsable: false,
          children: pathPlugins("../frame/Vue", "Vue/"),
        },
        {
          title: "React",
          collapsable: false,
          children: pathPlugins("../frame/React", "React/"),
        },
      ],
      "/algorithm/": [
        {
          title: "前端算法",
          collapsable: false,
          children: [["", "介绍"], "algorithm1", "algorithm2"],
        },
      ],
      "/code/": [
        {
          title: "代码块",
          collapsable: false,
          children: [["", "介绍"], "code1", "code2"],
        },
      ],
    },
  },
  plugins: [["@vuepress/back-to-top", true]],
});

function pathPlugins(cpath, name) {
  return fs
    .readdirSync(path.resolve(__dirname, cpath))
    .map((filename) => name + filename.slice(0, -3))
    .sort();
}
