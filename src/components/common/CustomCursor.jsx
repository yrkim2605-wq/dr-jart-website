import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'

// 흰색 원 + mix-blend-mode: difference 조합
// 밝은 배경 위에서는 검은색으로 보이고, 검은 글자와 겹치면 흰색으로 반전되어 보임
const CustomCursor = () => {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor || window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
      const isOverCustomHoverTarget = e.target.closest?.('[data-hide-cursor]')
      cursor.style.opacity = isOverCustomHoverTarget ? '0' : '1'
    }
    const handleMouseLeave = () => {
      cursor.style.opacity = '0'
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <Box
      ref={cursorRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        borderRadius: '50%',
        bgcolor: 'white',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 2000,
        opacity: 0,
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.2s ease',
        display: { xs: 'none', md: 'block' },
      }}
    />
  )
}

export default CustomCursor
