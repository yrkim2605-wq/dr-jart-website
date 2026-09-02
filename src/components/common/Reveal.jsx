import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'

const Reveal = ({ children, y = 40, duration = 1.2, threshold = 0.15 }) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Box
      ref={ref}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
      }}
    >
      {children}
    </Box>
  )
}

export default Reveal
