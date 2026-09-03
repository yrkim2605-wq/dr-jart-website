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

const pulseGlow = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.15);
  }
`

const labLabelSx = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  letterSpacing: 1.5,
}

// 이 구간(0~ZOOM_WINDOW) 동안 사진 프레임이 화면 가운데 작게 떠 있다가 풀블리드로 확대됨
// stage가 0→1로 바뀌는 지점(0.22)과 맞춰서, 확대가 끝난 직후 텍스트가 나타나도록 함
const ZOOM_WINDOW = 0.22
const FRAME_INSET_START = 28 // % - 시작 시 사방 여백
const FRAME_INSET_END = 0 // % - 다 확대된 뒤 여백
const FRAME_VERTICAL_SHIFT_START = 6 // % - 시작 시 프레임을 아래로 내리는 정도 (다 확대되면 0으로 수렴)

const Brand = () => {
  const wrapperRef = useRef(null)
  const [stage, setStage] = useState(0)
  const [isCrossHovered, setIsCrossHovered] = useState(false)
  const [zoomProgress, setZoomProgress] = useState(0)

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

      setZoomProgress(Math.min(progress / ZOOM_WINDOW, 1))

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
          bgcolor: 'black',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* 진입 시 화면 가운데보다 아래쪽에 작게 떠 있다가 스크롤에 따라 풀블리드로 확대되는 사진 프레임 */}
        <Box
          sx={{
            position: 'absolute',
            top: `${FRAME_INSET_START - (FRAME_INSET_START - FRAME_INSET_END) * zoomProgress + FRAME_VERTICAL_SHIFT_START * (1 - zoomProgress)}%`,
            bottom: `${FRAME_INSET_START - (FRAME_INSET_START - FRAME_INSET_END) * zoomProgress - FRAME_VERTICAL_SHIFT_START * (1 - zoomProgress)}%`,
            left: `${FRAME_INSET_START - (FRAME_INSET_START - FRAME_INSET_END) * zoomProgress}%`,
            right: `${FRAME_INSET_START - (FRAME_INSET_START - FRAME_INSET_END) * zoomProgress}%`,
            overflow: 'hidden',
            transition: 'top 1.1s cubic-bezier(0.16, 1, 0.3, 1), bottom 1.1s cubic-bezier(0.16, 1, 0.3, 1), left 1.1s cubic-bezier(0.16, 1, 0.3, 1), right 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'top, bottom, left, right',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${import.meta.env.BASE_URL}images/brand-photo.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              animation: `${kenBurns} 12s ease-in-out infinite alternate`,
            }}
          />

          {/* 프레임 모서리 장식 - 다 확대되면 서서히 사라짐 */}
          {[
            { top: 12, left: 12, borderWidth: '2px 0 0 2px' },
            { top: 12, right: 12, borderWidth: '2px 2px 0 0' },
            { bottom: 12, left: 12, borderWidth: '0 0 2px 2px' },
            { bottom: 12, right: 12, borderWidth: '0 2px 2px 0' },
          ].map((pos, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                width: 18,
                height: 18,
                borderColor: '#B7E3D5',
                borderStyle: 'solid',
                filter: 'drop-shadow(0 0 3px rgba(183, 227, 213, 0.7))',
                opacity: 1 - zoomProgress,
                ...pos,
              }}
            />
          ))}
        </Box>

        {/* 캔버스 느낌의 은은한 점선 가이드라인 + 십자 장식 (레퍼런스 참고) */}
        <Box
          sx={{
            position: 'absolute',
            left: '16%',
            top: 0,
            bottom: 0,
            width: 0,
            borderLeft: '1px dashed rgba(183, 227, 213, 0.22)',
            pointerEvents: 'none',
          }}
        />
        {/* 왼쪽 상단 점선 박스 안의 은은한 워터마크 반복 텍스트 (레퍼런스 참고) */}
        <Box
          sx={{
            position: 'absolute',
            top: 40,
            left: 40,
            right: '84%',
            bottom: '78.1%',
            opacity: 1 - zoomProgress,
            pointerEvents: 'none',
          }}
        >
          {[
            { top: 40, left: 0 },
            { top: 40, left: '52%' },
            { top: 62, left: 0 },
            { top: 62, left: '40%' },
            { top: 110, left: 0 },
          ].map((pos, i) => (
            <Typography
              key={i}
              sx={{
                position: 'absolute',
                fontSize: 11,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.12)',
                whiteSpace: 'nowrap',
                ...pos,
              }}
            >
              Dr.jart+ LABS
            </Typography>
          ))}
        </Box>

        {/* 반대편 대칭 세로 점선 - 간격이 더 넓은 점선 스타일 */}
        <Box
          sx={{
            position: 'absolute',
            right: '16%',
            top: 0,
            bottom: 0,
            width: '1px',
            background:
              'repeating-linear-gradient(to bottom, rgba(183, 227, 213, 0.22) 0px, rgba(183, 227, 213, 0.22) 3px, transparent 3px, transparent 16px)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '21.9%',
            left: 0,
            right: 0,
            height: 0,
            borderTop: '1px dashed rgba(183, 227, 213, 0.22)',
            pointerEvents: 'none',
          }}
        />
        {/* 사진 아래쪽의 촘촘한 가로 점선 - 확대되면 서서히 사라짐 */}
        <Box
          sx={{
            position: 'absolute',
            top: '87%',
            left: 0,
            right: 0,
            height: '1px',
            background:
              'repeating-linear-gradient(to right, rgba(183, 227, 213, 0.22) 0px, rgba(183, 227, 213, 0.22) 2px, transparent 2px, transparent 5px)',
            opacity: 1 - zoomProgress,
            pointerEvents: 'none',
          }}
        />

        {/* 진입 애니메이션(pulseGlow)이 opacity를 계속 점유하므로, 줌 진행에 따른 opacity는
            바깥 Box가, 펄스는 안쪽 아이콘이 각각 따로 담당하게 분리 */}
        <Box sx={{ position: 'absolute', top: '21.9%', left: '16%', transform: 'translate(-50%, calc(-50% + 2px))', opacity: 1 - zoomProgress }}>
          <AddIcon
            sx={{
              fontSize: 22,
              color: '#B7E3D5',
              animation: `${pulseGlow} 2.6s ease-in-out infinite`,
            }}
          />
        </Box>
        {/* 오른쪽 세로선 + 아래쪽 가로선이 교차하는 지점의 십자 장식 */}
        <Box sx={{ position: 'absolute', top: '87%', left: '84%', transform: 'translate(-50%, -50%)', opacity: 1 - zoomProgress }}>
          <AddIcon
            sx={{
              fontSize: 22,
              color: '#B7E3D5',
              animation: `${pulseGlow} 2.6s ease-in-out infinite 1.3s`,
            }}
          />
        </Box>

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
            fontSize: 22,
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
          <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#B7E3D5', ...labLabelSx }}>
            <ScrambleText text="LAB_01" start={stage >= 1} startDelay={0} duration={700} />
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 400, mt: 5, ...labLabelSx }}>
            <ScrambleText text="DERMATOLOGY" start={stage >= 1} startDelay={250} duration={700} />
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 400, mt: 2, ...labLabelSx }}>
            <ScrambleText text="SKIN_ANALYSIS" start={stage >= 1} startDelay={500} duration={700} />
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
          <Typography sx={{ fontSize: 14, fontWeight: 400, ...labLabelSx }}>
            <Box component="span" sx={{ display: 'block', color: '#B7E3D5' }}>
              <ScrambleText text="FORMULA_01" start={stage >= 1} duration={700} />
            </Box>
            <Box component="span" sx={{ display: 'block' }}>
              <ScrambleText text="SKIN_RESEARCH" start={stage >= 1} startDelay={250} duration={700} />
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
          <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#B7E3D5', whiteSpace: 'nowrap', ...labLabelSx }}>
            CLICK
          </Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 22, color: '#B7E3D5' }} />
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
