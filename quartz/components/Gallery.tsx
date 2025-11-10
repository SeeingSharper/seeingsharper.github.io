// @ts-ignore
import galleryScript from "./scripts/gallery.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Gallery: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return <div class={displayClass}></div>
}

Gallery.afterDOMLoaded = galleryScript

export default (() => Gallery) satisfies QuartzComponentConstructor
