import { useEffect, useRef, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { keyframes } from '@mui/material/styles'
import TypingText from '../common/TypingText'
import ScrambleText from '../common/ScrambleText'

const kenBurns = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.08);
  }
`

const arrowBounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Brand = () => {
  const wrapperRef = useRef(null)
  const [stage, setStage] = useState(0)
  const [isCrossHovered, setIsCrossHovered] = useState(false)

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
        {/* 배경 사진 (천천히 확대되는 켄번즈 효과) */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${import.meta.env.BASE_URL}images/brand-photo.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: `${kenBurns} 12s ease-in-out infinite alternate`,
          }}
        />

        {/* 진입 시(스크롤 전) 아래로 스크롤을 유도하는 인디케이터 */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            bottom: 40,
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            opacity: stage === 0 ? 1 : 0,
            transition: 'opacity 0.5s ease',
            pointerEvents: 'none',
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 500, letterSpacing: 2 }}>SCROLL</Typography>
          <KeyboardArrowDownIcon
            sx={{
              fontSize: 28,
              color: 'white',
              animation: `${arrowBounce} 1.4s ease-in-out infinite`,
            }}
          />
        </Box>

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
            <ScrambleText text="LAB 01" start={stage >= 1} startDelay={0} duration={700} />
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 400, mt: 5 }}>
            <ScrambleText text="DERMATOLOGY" start={stage >= 1} startDelay={250} duration={700} />
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 400, mt: 2 }}>
            <ScrambleText text="SKIN ANALYSIS" start={stage >= 1} startDelay={500} duration={700} />
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
            <Box component="span" sx={{ display: 'block' }}>
              <ScrambleText text="FORMULA 01" start={stage >= 1} duration={700} />
            </Box>
            <Box component="span" sx={{ display: 'block' }}>
              <ScrambleText text="SKIN RESEARCH" start={stage >= 1} startDelay={250} duration={700} />
            </Box>
          </Typography>
        </Box>

        {/* 십자가를 가리키는 CLICK 안내 (호버 전에만 표시) */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 100,
            right: 40,
            width: 60,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            opacity: stage >= 1 && !isCrossHovered ? 1 : 0,
            transform: stage >= 1 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.4s ease, transform 0.6s ease',
            pointerEvents: 'none',
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 500, letterSpacing: 2, color: 'white', whiteSpace: 'nowrap' }}>
            CLICK
          </Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 22, color: 'white' }} />
        </Box>

        {/* 우하단 십자가 - 호버 시 왼쪽에 View More가 나타나고 십자가가 회전 */}
        <Box
          onMouseEnter={() => setIsCrossHovered(true)}
          onMouseLeave={() => setIsCrossHovered(false)}
          sx={{
            position: 'absolute',
            bottom: 24,
            right: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            opacity: stage >= 1 ? 1 : 0,
            transform: stage >= 1 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            pointerEvents: stage >= 1 ? 'auto' : 'none',
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: -0.3,
              color: 'white',
              whiteSpace: 'nowrap',
              opacity: isCrossHovered ? 1 : 0,
              transform: isCrossHovered ? 'translateX(0)' : 'translateX(14px)',
              transition: 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            VIEW MORE
          </Typography>
          <AddIcon
            sx={{
              fontSize: 60,
              color: 'white',
              stroke: 'currentColor',
              strokeWidth: 2.5,
              animation: isCrossHovered ? `${spin} 1.1s linear infinite` : 'none',
            }}
          />
        </Box>

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
          <Typography
            sx={{
              fontSize: 48,
              fontWeight: 700,
              filter: stage === 2 ? 'blur(0px)' : 'blur(12px)',
              letterSpacing: stage === 2 ? 'normal' : '0.2em',
              transition: 'filter 1s ease, letter-spacing 1s ease',
            }}
          >
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
