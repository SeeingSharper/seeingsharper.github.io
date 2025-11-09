import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/tagCloud.scss"
import { resolveRelative } from "../util/path"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

interface TagCloudOptions {
  showTitle: boolean
  minFontSize: number
  maxFontSize: number
  sortByFrequency: boolean
}

const defaultOptions: TagCloudOptions = {
  showTitle: true,
  minFontSize: 0.8,
  maxFontSize: 1.8,
  sortByFrequency: false,
}

export default ((opts?: Partial<TagCloudOptions>) => {
  const options: TagCloudOptions = { ...defaultOptions, ...opts }

  const TagCloud: QuartzComponent = ({ fileData, allFiles, displayClass, cfg }: QuartzComponentProps) => {
    // Collect all tags and count their frequencies
    const tagFrequency = new Map<string, number>()

    allFiles.forEach((file) => {
      const tags = file.frontmatter?.tags ?? []
      tags.forEach((tag) => {
        tagFrequency.set(tag, (tagFrequency.get(tag) || 0) + 1)
      })
    })

    // Convert to array and sort
    let tagArray = Array.from(tagFrequency.entries())

    if (tagArray.length === 0) {
      return null
    }

    // Sort by frequency (descending) or alphabetically
    if (options.sortByFrequency) {
      tagArray.sort((a, b) => b[1] - a[1])
    } else {
      tagArray.sort((a, b) => a[0].localeCompare(b[0]))
    }

    // Calculate min and max frequencies for scaling
    const frequencies = tagArray.map(([_, count]) => count)
    const minFreq = Math.min(...frequencies)
    const maxFreq = Math.max(...frequencies)
    const freqRange = maxFreq - minFreq || 1 // Avoid division by zero

    // Calculate font size for a tag based on its frequency
    const getFontSize = (count: number): number => {
      const normalized = (count - minFreq) / freqRange
      return options.minFontSize + normalized * (options.maxFontSize - options.minFontSize)
    }

    return (
      <div class={classNames(displayClass, "tag-cloud")}>
        {options.showTitle && <h3>{i18n(cfg.locale).components.tagCloud?.title ?? "Tags"}</h3>}
        <div class="tag-cloud-container">
          {tagArray.map(([tag, count]) => {
            const linkDest = resolveRelative(fileData.slug!, `tags/${tag}`)
            const fontSize = getFontSize(count)
            return (
              <a
                href={linkDest}
                class="internal tag-cloud-link"
                style={`font-size: ${fontSize}rem;`}
                title={`${tag} (${count} ${count === 1 ? 'page' : 'pages'})`}
              >
                {tag}
              </a>
            )
          })}
        </div>
      </div>
    )
  }

  TagCloud.css = style

  return TagCloud
}) satisfies QuartzComponentConstructor

