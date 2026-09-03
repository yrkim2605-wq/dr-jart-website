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
      <Typography sx={{ fontSize: 50, fontWeight: 700, px: 4.5 }}>Dr.jart+</Typography>
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
        sx={{ mt: 8, width: '100%', overflow: 'hidden' }}
        onMouseEnter={() => {
          isHoveredRef.current = true
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false
        }}
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
          {STRIP_ITEMS.map((review, index) =>
            review.image ? (
              <Box
                key={`${review.id}-${index}`}
                component="img"
                src={`${import.meta.env.BASE_URL}${review.image}`}
                alt={review.label}
                sx={{ height: 320, aspectRatio: review.aspectRatio, flexShrink: 0, objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <Box
                key={`${review.id}-${index}`}
                sx={{ height: 320, width: 140, flexShrink: 0, bgcolor: '#EDECE7' }}
              />
            ),
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default ProductReview
