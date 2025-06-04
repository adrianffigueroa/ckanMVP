import { useEffect, useRef, useState } from 'react'

export default function CustomCarousel({ items }) {
  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [shouldScroll, setShouldScroll] = useState(false)

  // Calcular si debe moverse solo
  const evaluateShouldScroll = () => {
    const width = window.innerWidth
    if (width >= 768 && items.length > 4) return true
    if (width < 768 && items.length > 2) return true
    return false
  }

  useEffect(() => {
    const checkScroll = () => setShouldScroll(evaluateShouldScroll())
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [items.length])

  useEffect(() => {
    if (!shouldScroll || !scrollRef.current) return

    const container = scrollRef.current
    const item = container.querySelector('.carousel-item')
    const itemWidth = item?.offsetWidth || 250

    const interval = setInterval(() => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth
      if (container.scrollLeft + itemWidth >= maxScrollLeft) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: itemWidth, behavior: 'smooth' })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [shouldScroll])

  const onMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const onMouseLeave = () => setIsDragging(false)
  const onMouseUp = () => setIsDragging(false)

  const onMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth select-none"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="carousel-item snap-start pt-4 flex-shrink-0 w-[280px] sm:w-[250px] mx-auto px-2 md:px-4"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
