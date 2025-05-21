import { useEffect, useRef, useState } from 'react'

export default function CustomCarousel({ items }) {
  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return
      const container = scrollRef.current
      const itemWidth = container.querySelector('div')?.offsetWidth || 250
      const maxScrollLeft = container.scrollWidth - container.clientWidth

      // Si llegó al final, vuelve al inicio
      if (container.scrollLeft + itemWidth >= maxScrollLeft) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: itemWidth + 16, behavior: 'smooth' }) // +gap
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [items])
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
    const walk = (x - startX) * 1.5 // ajustar sensibilidad
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div className="relative h-[300px] w-full overflow-visible px-2 bg-none">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 scroll-smooth no-scrollbar px-4 rounded-[40px]"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="min-w-[250px] h-[280px] pt-6 flex-shrink-0"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
