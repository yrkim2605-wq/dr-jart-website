import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// image가 없는 리뷰는 사진 도착 전까지 회색 박스로 표시됨
// aspectRatio는 원본 사진의 가로/세로 비율값. 사진이 로드되기 전에도 미리 자리를 잡아둬서
// 로딩 중 레이아웃이 흔들려 스크롤 애니메이션 속도가 들쭉날쭉해지는 것을 막아준다.
const REVIEWS = [
  { id: 'yr', label: 'yr***', image: 'images/reviews/review-1.jpg', aspectRatio: 1440 / 1800 },
  { id: 'pj', label: 'pj***', image: 'images/reviews/review-2.jpg', aspectRatio: 683 / 512 },
  { id: 'cb', label: 'cb***', image: 'images/reviews/review-3.jpg', aspectRatio: 1440 / 1800 },
  { id: 'yj', label: 'yj***', image: 'images/reviews/review-4.png', aspectRatio: 720 / 1280 },
  { id: 'sh', label: 'sh***', image: 'images/reviews/review-5.jpg', aspectRatio: 768 / 512 },
  { id: 'mj', label: 'mj***', image: 'images/reviews/review-6.jpg', aspectRatio: 512 / 512 },
]

// 무한 스크롤처럼 보이도록 리스트를 두 번 이어붙여서 절반(-50%) 지점에서 끊김 없이 반복
const STRIP_ITEMS = [...REVIEWS, ...REVIEWS]

// 정상 속도 기준: 절반 폭(halfWidth)을 이 시간(ms) 동안 이동
const NORMAL_DURATION = 6000
const HOVER_SPEED_RATIO = 0.3 // 호버 시 정상 속도 대비 배율

const ProductReview = () => {
  const titleRef = useRef(null)
  const [started, setStarted] = useState(false)

  const stripRef = useRef(null)
  const isHoveredRef = useRef(false)
  const positionRef = useRef(0)
  const currentSpeedRef = useRef(0)

  const reviewStageRef = useRef(null)
  const [isReviewHovered, setIsReviewHovered] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  // 모바일(터치)에서는 hover가 없어서, 탭한 사진을 잠시 hover 상태처럼 보여줌
  const [touchActiveKey, setTouchActiveKey] = useState(null)

  const handleReviewMouseMove = (e) => {
    const rect = reviewStageRef.current.getBoundingClientRect()
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

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

  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return

    const halfWidth = strip.scrollWidth / 2
    const normalSpeed = halfWidth / NORMAL_DURATION // px per ms
    currentSpeedRef.current = normalSpeed

    let frameId
    let lastTime = performance.now()

    const tick = (now) => {
      const dt = now - lastTime
      lastTime = now

      const targetSpeed = isHoveredRef.current ? normalSpeed * HOVER_SPEED_RATIO : normalSpeed
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.05

      positionRef.current += currentSpeedRef.current * dt
      if (positionRef.current >= halfWidth) positionRef.current -= halfWidth

      strip.style.transform = `translateX(${-positionRef.current}px)`
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <Box component="section" sx={{ pt: 24 }}>
      <Typography sx={{ fontSize: 25, fontWeight: 700, px: 4.5 }}>Dr.jart+</Typography>
      <Box ref={titleRef}>
        <Box sx={{ overflow: 'hidden', mt: 15 }}>
          <Typography
            sx={{
              fontSize: 40,
              fontWeight: 500,
              textAlign: 'center',
              transform: started ? 'translateY(0)' : 'translateY(110%)',
              transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            PRODUCT REVIEW
          </Typography>
        </Box>
        <Box sx={{ overflow: 'hidden', mt: 1.5 }}>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 500,
              textAlign: 'center',
              color: 'text.primary',
              transform: started ? 'translateY(0)' : 'translateY(110%)',
              transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s',
            }}
          >
            수많은 고객들의 현실 리뷰
          </Typography>
        </Box>
      </Box>

      <Box
        ref={reviewStageRef}
        data-hide-cursor
        onMouseMove={handleReviewMouseMove}
        onMouseEnter={() => {
          isHoveredRef.current = true
          setIsReviewHovered(true)
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false
          setIsReviewHovered(false)
        }}
        sx={{ position: 'relative', mt: 8, width: '100%', overflow: 'hidden', cursor: 'none' }}
      >
        <Box
          ref={stripRef}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {STRIP_ITEMS.map((review, index) => {
            const itemKey = `${review.id}-${index}`
            return review.image ? (
              <Box
                key={itemKey}
                tabIndex={0}
                onTouchStart={() => setTouchActiveKey(itemKey)}
                onTouchEnd={() => setTimeout(() => setTouchActiveKey((cur) => (cur === itemKey ? null : cur)), 800)}
                className={touchActiveKey === itemKey ? 'touchActive' : undefined}
                sx={{
                  position: 'relative',
                  height: 320,
                  aspectRatio: review.aspectRatio,
                  flexShrink: 0,
                  overflow: 'hidden',
                  outline: 'none',
                  '&:hover .reviewImage, &:focus-visible .reviewImage, &.touchActive .reviewImage': {
                    transform: 'scale(1.08)',
                    filter: 'brightness(0.85) saturate(1.15)',
                  },
                  '&:hover .reviewOverlay, &:focus-visible .reviewOverlay, &.touchActive .reviewOverlay': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                }}
              >
                <Box
                  component="img"
                  className="reviewImage"
                  src={`${import.meta.env.BASE_URL}${review.image}`}
                  alt={review.label}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    willChange: 'transform',
                    transition: 'transform 0.4s ease, filter 0.4s ease',
                  }}
                />
                <Box
                  className="reviewOverlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'flex-end',
                    p: 1,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0) 55%)',
                    opacity: 0,
                    transform: 'translateY(6px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    pointerEvents: 'none',
                  }}
                >
                  <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'white' }}>{review.label}</Typography>
                </Box>
              </Box>
            ) : (
              <Box key={itemKey} sx={{ height: 320, width: 140, flexShrink: 0, bgcolor: '#EDECE7' }} />
            )
          })}
        </Box>

        {/* 리뷰 위에서 커서를 따라다니는 View More 원형 라벨 */}
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
            opacity: isReviewHovered ? 1 : 0,
            transform: `scale(${isReviewHovered ? 1 : 0.5})`,
            transition: isReviewHovered
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
  )
}

export default ProductReview
