import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'

const TypingText = ({ lines, start = true, startDelay = 0, charInterval = 35 }) => {
  const [visibleCounts, setVisibleCounts] = useState(lines.map(() => 0))
  const isDone = useRef(false)

  useEffect(() => {
    if (!start || isDone.current) return

    let cancelled = false
    let timeoutId

    const typeLine = (lineIndex) => {
      if (cancelled) return
      if (lineIndex >= lines.length) {
        isDone.current = true
        return
      }
      const step = (charIndex) => {
        if (cancelled) return
        setVisibleCounts((prev) => {
          const next = [...prev]
          next[lineIndex] = charIndex
          return next
        })
        if (charIndex < lines[lineIndex].length) {
          timeoutId = setTimeout(() => step(charIndex + 1), charInterval)
        } else {
          typeLine(lineIndex + 1)
        }
      }
      step(1)
    }

    timeoutId = setTimeout(() => typeLine(0), startDelay)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [start])

  return lines.map((line, i) => (
    <Box key={i} component="span" sx={{ display: 'block' }}>
      {line.slice(0, visibleCounts[i])}
      <Box component="span" sx={{ opacity: 0 }}>
        {line.slice(visibleCounts[i])}
      </Box>
    </Box>
  ))
}

export default TypingText
