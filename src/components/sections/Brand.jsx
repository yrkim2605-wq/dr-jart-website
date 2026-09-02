import { useEffect, useRef, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import TypingText from '../common/TypingText'

const Brand = () => {
  const wrapperRef = useRef(null)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    let ticking = false

    const computeStage = () => {
      ticking = false
      const el = wrapperRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight
      if (scrollableDistance <= 0) return

      const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1)

      if (progress < 0.22) setStage(0)
      else if (progress < 0.75) setStage(1)
      else setStage(2)
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(computeStage)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    computeStage()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Box ref={wrapperRef} sx={{ position: 'relative', height: '380vh' }}>
      <Box
        component="section"
        sx={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* 배경 사진 */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${import.meta.env.BASE_URL}images/brand-photo.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* 텍스트 가독성을 위한 어둡게 처리 (Dr+J+art 등장 이후) */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'black',
            opacity: stage >= 1 ? 0.45 : 0,
            transition: 'opacity 0.6s ease',
            pointerEvents: 'none',
          }}
        />

        {/* 좌상단 로고 */}
        <Typography
          sx={{
            position: 'absolute',
            top: 32,
            left: 40,
            fontSize: 50,
            fontWeight: 700,
            opacity: stage >= 1 ? 1 : 0,
            transform: stage >= 1 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            pointerEvents: 'none',
          }}
        >
          <TypingText lines={['Dr.jart+']} start={stage >= 1} />
        </Typography>

        {/* 우상단 랩 정보 */}
        <Box
          sx={{
            position: 'absolute',
            top: 32,
            right: 40,
            textAlign: 'right',
            opacity: stage >= 1 ? 1 : 0,
            transform: stage >= 1 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            pointerEvents: 'none',
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            <TypingText lines={['LAB 01']} start={stage >= 1} startDelay={0} />
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 400, mt: 5 }}>
            <TypingText lines={['DERMATOLOGY']} start={stage >= 1} startDelay={300} />
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 400, mt: 2 }}>
            <TypingText lines={['SKIN ANALYSIS']} start={stage >= 1} startDelay={600} />
          </Typography>
        </Box>

        {/* 좌하단 포뮬러 정보 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 32,
            left: 40,
            opacity: stage >= 1 ? 1 : 0,
            transform: stage >= 1 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            pointerEvents: 'none',
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            <TypingText lines={['FORMULA 01', 'SKIN RESEARCH']} start={stage >= 1} />
          </Typography>
        </Box>

        {/* 우하단 십자가 */}
        <AddIcon
          sx={{
            position: 'absolute',
            bottom: 24,
            right: 40,
            fontSize: 40,
            color: 'white',
            stroke: 'currentColor',
            strokeWidth: 2.5,
            opacity: stage >= 1 ? 1 : 0,
            transform: stage >= 1 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            pointerEvents: 'none',
          }}
        />

        {/* Dr + J + art */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 4,
            opacity: stage === 1 ? 1 : 0,
            transform: stage === 1 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.85)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            pointerEvents: 'none',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: 36, fontWeight: 700 }}>Dr</Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 500 }}>이성</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: 36, fontWeight: 700 }}>+</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: 36, fontWeight: 700 }}>J</Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
              join
              <br /> junction
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: 36, fontWeight: 700 }}>+</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: 36, fontWeight: 700 }}>art</Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 500 }}>감성</Typography>
          </Box>
        </Box>

        {/* 'Doctor Joins Art' 의학과 예술의 만남 */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            px: 4,
            opacity: stage === 2 ? 1 : 0,
            transform: stage === 2 ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.94)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            pointerEvents: 'none',
          }}
        >
          <Typography sx={{ fontSize: 48, fontWeight: 700 }}>
            &apos;Doctor Joins Art&apos;{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              의학과 예술의 만남
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Brand
