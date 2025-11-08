import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Seeing Sharper",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
      // If you configure a custom domain name in Plausible, you can add options here
      // e.g., domain: "seeingsharper.dev"
    },
    locale: "en-US",
    // Use one canonical base domain; .com and .net can point/redirect to this
    baseUrl: "https://seeingsharper.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Rajdhani",
        body: "Titillium Web",
        code: "Share Tech Mono",
      },
      colors: {
        lightMode: {
          light: "#1a1f2e",
          lightgray: "#2a3147",
          gray: "#4a5568",
          darkgray: "#00d4ff",
          dark: "#e0f2ff",
          secondary: "#00d4ff",
          tertiary: "#ff9500",
          highlight: "rgba(0, 212, 255, 0.15)",
          textHighlight: "#ff950088",
        },
        darkMode: {
          light: "#0a0e1a",
          lightgray: "#1a2033",
          gray: "#3a4a5f",
          darkgray: "#a0c4d9",
          dark: "#e0f2ff",
          secondary: "#00d4ff",
          tertiary: "#ff9500",
          highlight: "rgba(0, 212, 255, 0.15)",
          textHighlight: "#ff950088",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
        // baseUrl is taken from configuration.baseUrl; no need to repeat here
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config