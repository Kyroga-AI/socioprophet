import { defineConfig } from "vitepress";

const repo = (process.env.GITHUB_REPOSITORY || "socioprophet").split("/").pop() || "socioprophet";
const base = process.env.DOCS_BASE || "/" + repo + "/";

export default defineConfig({
  title: "SocioProphet",
  description: "SocioProphet documentation",
  base,
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "Docs", link: "/" },
      { text: "Getting Started", link: "/guide/getting-started" },
      { text: "Architecture", link: "/guide/architecture" }
    ],
    sidebar: {
      "/guide/": [
        { text: "Getting Started", link: "/guide/getting-started" },
        { text: "Architecture", link: "/guide/architecture" }
      ]
    }
  }
});
