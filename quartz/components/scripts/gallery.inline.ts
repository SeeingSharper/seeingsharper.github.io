// Image Gallery with Lightbox functionality
document.addEventListener("nav", () => {
  // Find all vision gallery containers
  const galleries = document.querySelectorAll(".vision-gallery")

  if (galleries.length === 0) return

  // Shuffle array function
  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Create lightbox element if it doesn't exist
  let lightbox = document.querySelector(".lightbox") as HTMLElement
  if (!lightbox) {
    lightbox = document.createElement("div")
    lightbox.className = "lightbox"
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img src="" alt="">
        <span class="lightbox-close">&times;</span>
        <span class="lightbox-prev">&#8249;</span>
        <span class="lightbox-next">&#8250;</span>
        <div class="lightbox-counter"></div>
      </div>
    `
    document.body.appendChild(lightbox)
  }

  const lightboxImg = lightbox.querySelector("img") as HTMLImageElement
  const closeBtn = lightbox.querySelector(".lightbox-close") as HTMLElement
  const prevBtn = lightbox.querySelector(".lightbox-prev") as HTMLElement
  const nextBtn = lightbox.querySelector(".lightbox-next") as HTMLElement
  const counter = lightbox.querySelector(".lightbox-counter") as HTMLElement

  let currentImages: HTMLImageElement[] = []
  let currentIndex = 0

  // Touch/swipe detection
  let touchStartX = 0
  let touchStartY = 0
  let touchEndX = 0
  let touchEndY = 0

  // Function to open lightbox
  function openLightbox(index: number) {
    currentIndex = index
    lightboxImg.src = currentImages[currentIndex].src
    lightboxImg.alt = currentImages[currentIndex].alt
    counter.textContent = `${currentIndex + 1} / ${currentImages.length}`
    lightbox!.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  // Function to close lightbox
  function closeLightbox() {
    lightbox!.classList.remove("active")
    document.body.style.overflow = ""
  }

  // Function to show next image
  function showNext() {
    currentIndex = (currentIndex + 1) % currentImages.length
    openLightbox(currentIndex)
  }

  // Function to show previous image
  function showPrev() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length
    openLightbox(currentIndex)
  }

  // Set up each gallery
  galleries.forEach((gallery) => {
    const images = Array.from(gallery.querySelectorAll("img")) as HTMLImageElement[]

    // Clear the entire gallery
    gallery.innerHTML = ""

    // Create shuffle button
    const shuffleBtn = document.createElement("button")
    shuffleBtn.className = "shuffle-button"
    shuffleBtn.textContent = "🔀 Shuffle"

    // Insert shuffle button before gallery
    gallery.parentElement?.insertBefore(shuffleBtn, gallery)

    // Wrap each image and add to gallery
    images.forEach((img, index) => {
      const wrapper = document.createElement("div")
      wrapper.className = "vision-gallery-item"
      wrapper.appendChild(img)
      gallery.appendChild(wrapper)

      // Add click handler
      img.addEventListener("click", () => {
        currentImages = images
        openLightbox(index)
      })
    })

    // Shuffle gallery function
    function shuffleGallery() {
      const items = Array.from(gallery.querySelectorAll(".vision-gallery-item"))
      const shuffled = shuffleArray(items)
      gallery.innerHTML = ""
      shuffled.forEach((item) => gallery.appendChild(item))
    }

    shuffleBtn.addEventListener("click", shuffleGallery)

    // Auto-shuffle on page load
    shuffleGallery()
  })

  // Close button
  closeBtn.addEventListener("click", closeLightbox)

  // Navigation buttons
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    showPrev()
  })

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    showNext()
  })

  // Click outside image to close
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox()
    }
  })

  // Keyboard navigation
  const handleKeydown = (e: KeyboardEvent) => {
    if (!lightbox!.classList.contains("active")) return

    switch (e.key) {
      case "Escape":
        closeLightbox()
        break
      case "ArrowLeft":
        showPrev()
        break
      case "ArrowRight":
        showNext()
        break
    }
  }

  document.addEventListener("keydown", handleKeydown)
  window.addCleanup(() => document.removeEventListener("keydown", handleKeydown))

  // Touch/swipe handlers
  const handleTouchStart = (e: TouchEvent) => {
    if (!lightbox!.classList.contains("active")) return
    touchStartX = e.changedTouches[0].screenX
    touchStartY = e.changedTouches[0].screenY
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (!lightbox!.classList.contains("active")) return
    touchEndX = e.changedTouches[0].screenX
    touchEndY = e.changedTouches[0].screenY
    handleSwipe()
  }

  function handleSwipe() {
    const swipeThreshold = 50
    const deltaX = touchEndX - touchStartX
    const deltaY = touchEndY - touchStartY

    // Determine if horizontal or vertical swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) {
          // Swipe right - previous image
          showPrev()
        } else {
          // Swipe left - next image
          showNext()
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > swipeThreshold && deltaY > 0) {
        // Swipe down - close lightbox
        closeLightbox()
      }
    }
  }

  lightbox.addEventListener("touchstart", handleTouchStart, { passive: true })
  lightbox.addEventListener("touchend", handleTouchEnd, { passive: true })

  window.addCleanup(() => {
    lightbox.removeEventListener("touchstart", handleTouchStart)
    lightbox.removeEventListener("touchend", handleTouchEnd)
  })
})
