import { useRef, useState } from 'react'

export default function CustomCarousel({ items }) {
  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

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
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 scroll-smooth py-4 px-8 no-scrollbar cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="min-w-[250px] flex-shrink-0 hover:scale-105 transition-transform duration-300"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
