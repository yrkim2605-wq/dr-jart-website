import { useEffect, useRef, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'

// width는 각 상품 사진의 실제 가로세로 비율 기준으로, 지름 112px 원의 대각선 안에
// 딱 들어오도록 계산한 값 (사진마다 비율이 달라서 하나의 % 값으로는 못 맞춤)
const CONCERNS = [
  { id: '전체보기', label: '전체보기', image: 'images/concerns/all.jpg', mode: 'cover' },
  { id: 'REDNESS', label: 'REDNESS', image: 'images/concerns/redness.png', mode: 'contain', width: 27, isNew: true },
  { id: 'DRYNESS', label: 'DRYNESS', image: 'images/concerns/dryness.png', mode: 'contain', width: 68 },
  { id: 'PORES', label: 'PORES', image: 'images/concerns/pores.png', mode: 'contain', width: 22 },
  { id: 'BARRIER', label: 'BARRIER', image: 'images/concerns/barrier.png', mode: 'contain', width: 27 },
]

const SkinConcern = ({ selectedConcern, onSelectConcern }) => {
  const titleRef = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Box component="section" sx={{ pt: 25 }}>
      <Box
        ref={titleRef}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}
      >
        <Box
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            maxWidth: started ? 700 : 0,
            transition: 'max-width 2.4s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <Typography sx={{ fontSize: 40, fontWeight: 500, textAlign: 'center' }}>
            What&apos;s your skin concern?
          </Typography>
        </Box>
        <Box
          component="img"
          src={`${import.meta.env.BASE_URL}images/decor/magnifier.png`}
          alt=""
          sx={{
            width: 40,
            height: 'auto',
            flexShrink: 0,
            transform: 'scaleX(-1)',
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 12 }}>
        {CONCERNS.map((concern) => {
          const isSelected = concern.id === selectedConcern
          return (
            <Box key={concern.id} sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: 112,
                  height: 112,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <ButtonBase
                  onClick={() => onSelectConcern(concern.id)}
                  sx={{
                    width: 112,
                    height: 112,
                    borderRadius: '50%',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      width: 112,
                      height: 112,
                      borderRadius: '50%',
                      bgcolor: '#EDECE7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: concern.mode === 'cover' ? 'hidden' : 'visible',
                      border: '2px solid',
                      borderColor: isSelected ? 'primary.main' : 'transparent',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.25s ease',
                    }}
                  >
                    <Box
                      component="img"
                      src={`${import.meta.env.BASE_URL}${concern.image}`}
                      alt={concern.label}
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                      sx={
                        concern.mode === 'cover'
                          ? { width: '100%', height: '100%', objectFit: 'cover' }
                          : { width: concern.width, height: 'auto', display: 'block' }
                      }
                    />
                  </Box>
                </ButtonBase>
                {concern.isNew && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 2,
                      right: 0,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      fontWeight: 700,
                      pointerEvents: 'none',
                    }}
                  >
                    N
                  </Box>
                )}
              </Box>
              <Typography
                onClick={() => onSelectConcern(concern.id)}
                sx={{
                  fontSize: 15,
                  mt: 1,
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? 'primary.main' : 'inherit',
                  cursor: 'pointer',
                  transition: 'color 0.25s ease',
                }}
              >
                {concern.label}
              </Typography>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default SkinConcern