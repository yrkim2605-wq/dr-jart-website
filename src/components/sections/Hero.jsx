import { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import { keyframes } from '@mui/material/styles'
import ScrambleText from '../common/ScrambleText'

const wave = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-15px);
  }
`

const drawLine = keyframes`
  from {
    stroke-dashoffset: 100;
  }
  to {
    stroke-dashoffset: 0;
  }
`

const productFloat = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`

const growDown = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`

const iconIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const letterIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(var(--enter-x, -60vw)) translateY(0.3em);
  }
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
`

const ENTER_DURATION = 0.9
const ENTER_STAGGER = 0.06

const WaveText = ({ text, sx, direction = 'left' }) => (
  <Typography sx={{ ...sx, '--enter-x': direction === 'right' ? '60vw' : '-60vw' }}>
    {text.split('').map((char, index) => {
      const enterDelay = index * ENTER_STAGGER
      return (
        <Box
          key={index}
          component="span"
          sx={{
            display: 'inline-block',
            animation: `${letterIn} ${ENTER_DURATION}s cubic-bezier(0.22, 1.2, 0.36, 1) ${enterDelay}s both, ${wave} 1.6s ease-in-out ${ENTER_DURATION + enterDelay}s infinite`,
          }}
        >
          {char}
        </Box>
      )
    })}
  </Typography>
)

const Hero = () => {
  const productStageRef = useRef(null)
  const [isProductHovered, setIsProductHovered] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  const handleProductMouseMove = (e) => {
    const rect = productStageRef.current.getBoundingClientRect()
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <Box component="section" sx={{ position: 'relative', minHeight: 760, pl: '50px', overflow: 'hidden' }}>
      <WaveText text="Dr." direction="left" sx={{ fontSize: 150, fontWeight: 800, mt: '-20px', pointerEvents: 'none' }} />

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          height: 321,
          pointerEvents: 'none',
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              transform: 'translateY(-140px) scale(3.5)',
              pointerEvents: 'none',
            }}
          >
            <Box
              component="img"
              src={`${import.meta.env.BASE_URL}images/hero-product.png`}
              alt="시카페어 수딩 컬러 코렉팅 트리트먼트"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(10px 10px 8px rgba(0, 0, 0, 0.25))',
                animation: `${productFloat} 3.4s ease-in-out 0.5s infinite`,
              }}
            />
          </Box>

          {/* 실제 상품(병 실루엣) 영역에만 맞춘 호버 감지 영역 - 이미지의 넓은 투명 여백은 제외 */}
          <Box
            ref={productStageRef}
            data-hide-cursor
            onMouseMove={handleProductMouseMove}
            onMouseEnter={() => setIsProductHovered(true)}
            onMouseLeave={() => setIsProductHovered(false)}
            sx={{
              position: 'absolute',
              left: -25,
              top: -50,
              width: 400,
              height: 360,
              cursor: 'none',
              pointerEvents: 'auto',
            }}
          >
            {/* 상품 안에서 커서를 따라다니는 View More 원형 라벨 */}
            <Box
              sx={{
                position: 'absolute',
                width: 88,
                height: 88,
                borderRadius: '50%',
                bgcolor: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                left: cursorPos.x - 44,
                top: cursorPos.y - 44,
                opacity: isProductHovered ? 1 : 0,
                transform: `scale(${isProductHovered ? 1 : 0.5})`,
                transition: isProductHovered
                  ? 'opacity 0.2s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)'
                  : 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: -0.3,
                  color: 'white',
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}
              >
                VIEW
                <br />
                MORE
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* 쿨소닉 테크놀로지 안내 문구 + 연결선 (왼쪽, 가로→대각선→가로) */}
        <Typography
          sx={{
            position: 'absolute',
            top: 5,
            left: -245,
            width: 150,
            fontSize: 14,
            lineHeight: 1.2,
            textAlign: 'left',
          }}
        >
          <Box component="span" sx={{ display: 'block', color: 'secondary.main' }}>
            <ScrambleText text="쿨소닉 테크놀로지가" startDelay={300} duration={1400} />
          </Box>
          <Box component="span" sx={{ display: 'block' }}>
            <ScrambleText text="결합된 CICAPAIR" startDelay={900} duration={1400} />
          </Box>
        </Typography>
        <Box
          component="svg"
          width={216}
          height={110}
          sx={{ position: 'absolute', top: 0, left: -245, overflow: 'visible' }}
        >
          {/* 텍스트 쪽 구간 (고정) */}
          <Box
            component="polyline"
            points="0,48 139,48"
            pathLength="100"
            fill="none"
            stroke="black"
            strokeWidth="1"
            sx={{
              strokeDasharray: '100',
              animation: `${drawLine} 0.5s ease-out 0.2s both`,
            }}
          />
          {/* 제품 쪽 구간 (그려진 뒤 계속 위아래로 bob) */}
          <Box
            component="polyline"
            points="139,48 162,106 216,106"
            pathLength="100"
            fill="none"
            stroke="black"
            strokeWidth="1"
            sx={{
              strokeDasharray: '100',
              animation: `${drawLine} 0.4s ease-out 0.7s both`,
            }}
          >
            <animate
              attributeName="points"
              values="139,48 162,106 216,106;139,48 162,122 216,122;139,48 162,106 216,106"
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              dur="2.8s"
              begin="1.3s"
              repeatCount="indefinite"
            />
          </Box>
          {/* 제품 쪽 끝 네모 마커 (선과 같은 SVG, 같은 SMIL 타이밍으로 고정 연결) */}
          <Box component="g" opacity={0}>
            <animate
              attributeName="opacity"
              values="0;1"
              dur="0.3s"
              begin="1.1s"
              fill="freeze"
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0;0,16;0,0"
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              dur="2.8s"
              begin="1.3s"
              repeatCount="indefinite"
            />
            <rect x={216} y={96} width={16} height={15} fill="white" stroke="black" strokeWidth="1.5" />
            <rect x={221} y={100.5} width={6} height={6} fill="black" />
          </Box>
        </Box>

        {/* 1회 사용 효과 안내 문구 + 연결선 (오른쪽, 잡 쪽 가로 → 대각선 → 텍스트) */}
        <Typography
          sx={{
            position: 'absolute',
            top: 192,
            left: 365,
            width: 180,
            fontSize: 14,
            lineHeight: 1.2,
            textAlign: 'right',
          }}
        >
          <Box component="span" sx={{ display: 'block', color: 'secondary.main' }}>
            <ScrambleText text="1회 사용으로 민감해진" startDelay={500} duration={1400} />
          </Box>
          <Box component="span" sx={{ display: 'block' }}>
            <ScrambleText text="피부를 빠르게 진정" startDelay={1100} duration={1400} />
          </Box>
        </Typography>
        <Box
          component="svg"
          width={190}
          height={285}
          sx={{ position: 'absolute', top: 0, left: 351, overflow: 'visible' }}
        >
          {/* 텍스트 쪽 구간 (고정) */}
          <Box
            component="polyline"
            points="40,238 190,238"
            pathLength="100"
            fill="none"
            stroke="black"
            strokeWidth="1"
            sx={{
              strokeDasharray: '100',
              animation: `${drawLine} 0.5s ease-out 0.4s both`,
            }}
          />
          {/* 제품 쪽 구간 (그려진 뒤 계속 위아래로 bob) */}
          <Box
            component="polyline"
            points="0,285 16,285 40,238"
            pathLength="100"
            fill="none"
            stroke="black"
            strokeWidth="1"
            sx={{
              strokeDasharray: '100',
              animation: `${drawLine} 0.4s ease-out 0.9s both`,
            }}
          >
            <animate
              attributeName="points"
              values="0,285 16,285 40,238;0,269 16,269 40,238;0,285 16,285 40,238"
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              dur="2.8s"
              begin="1.5s"
              repeatCount="indefinite"
            />
          </Box>
        </Box>
      </Box>

      {/* 오른쪽 세로 사이드바: + + | CICAPAIR+ FORMULA 01 REDNESS CARE */}
      <Box sx={{ position: 'absolute', top: 50, right: 220, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 1, pointerEvents: 'none' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            sx={{
              width: '3px',
              height: 110,
              bgcolor: 'black',
              mt: '-15px',
              transformOrigin: 'top',
              animation: `${growDown} 0.6s ease-out 0.2s both`,
            }}
          />
          <Box
            sx={{
              width: '1px',
              height: 400,
              bgcolor: 'secondary.main',
              transformOrigin: 'top',
              animation: `${growDown} 1.4s ease-out 0.8s both`,
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box sx={{ height: 34, overflow: 'visible', transform: 'translateY(-15px)' }}>
            <AddIcon
              sx={{
                fontSize: 40,
                color: '#d9d9d9',
                stroke: 'currentColor',
                strokeWidth: 2.5,
                display: 'block',
                opacity: 0,
                animation: `${iconIn} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both`,
              }}
            />
            <AddIcon
              sx={{
                fontSize: 40,
                color: '#d9d9d9',
                stroke: 'currentColor',
                strokeWidth: 2.5,
                display: 'block',
                opacity: 0,
                animation: `${iconIn} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s both`,
              }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: 1,
              lineHeight: 1.2,
              color: 'secondary.main',
              writingMode: 'vertical-rl',
              mt: '45px',
            }}
          >
            CICAPAIR+
            <br />
            FORMULA 01
            <br />
            REDNESS CARE
          </Typography>
        </Box>
      </Box>

      {/* 왼쪽 하단 브랜드 태그라인 */}
      <Box sx={{ position: 'absolute', left: '50px', bottom: 55, pointerEvents: 'none' }}>
        <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
          <ScrambleText text="Dr.Jart+" startDelay={700} duration={2200} />
        </Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 500, mt: 3 }}>
          <Box component="span" sx={{ display: 'block' }}>
            <ScrambleText text="KOREAN SKIN BARRIER EXPERTS." startDelay={2000} duration={2600} />
          </Box>
          <Box component="span" sx={{ display: 'block' }}>
            <ScrambleText text="DREAM INSPIRED. ARTFULLY DELIVERED." startDelay={2900} duration={2600} />
          </Box>
        </Typography>
      </Box>

      <WaveText
        text="Jart+"
        direction="right"
        sx={{
          fontSize: 150,
          fontWeight: 800,
          position: 'absolute',
          right: 32,
          bottom: 10,
          pointerEvents: 'none',
        }}
      />
    </Box>
  )
}
export default Hero