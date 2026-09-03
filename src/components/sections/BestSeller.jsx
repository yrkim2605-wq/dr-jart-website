import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import { BEST_SELLER_PRODUCTS } from '../../constants/products'
import Chip from '@mui/material/Chip'
import { keyframes } from '@mui/material/styles'

const formatPrice = (price) => `${price.toLocaleString('ko-KR')}원`

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

// 이미지 박스가 위→아래로 커튼처럼 열리는 리빌
const curtainReveal = keyframes`
  from { clip-path: inset(0 0 100% 0); }
  to { clip-path: inset(0 0 0% 0); }
`

// 커튼이 열리는 동안 사진이 확대된 상태에서 서서히 원래 크기로 줌아웃
const zoomOut = keyframes`
  from { transform: scale(1.35); }
  to { transform: scale(1); }
`

const BestSeller = ({ selectedConcern }) => {
  const products = BEST_SELLER_PRODUCTS[selectedConcern] ?? []

  const titleRef = useRef(null)
  const [titleStarted, setTitleStarted] = useState(false)

  // 모바일(터치)에서는 hover가 없어서, 탭한 카드를 잠시 hover 상태처럼 보여줌
  const [touchActiveId, setTouchActiveId] = useState(null)

  const magnetRef = useRef(null)

  // 마우스 위치에 따라 살짝 끌려오면서(자석 효과) 3D로 기울어지는 버튼
  const handleMagnetMove = (e) => {
    const el = magnetRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    const rotateX = (-relY / rect.height) * 14
    const rotateY = (relX / rect.width) * 14
    el.style.transform = `perspective(400px) translate(${relX * 0.3}px, ${relY * 0.4}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMagnetLeave = () => {
    const el = magnetRef.current
    if (!el) return
    el.style.transform = 'perspective(400px) translate(0px, 0px) rotateX(0deg) rotateY(0deg)'
  }

  useEffect(() => {
    const el = titleRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Box component="section" sx={{ pt: 20 }}>
      <Box ref={titleRef} sx={{ overflow: 'hidden' }}>
        <Typography
          sx={{
            fontSize: 40,
            fontWeight: 500,
            textAlign: 'center',
            transform: titleStarted ? 'translateY(0)' : 'translateY(110%)',
            transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          BEST SELLER
        </Typography>
      </Box>
      <Box key={selectedConcern} sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
        {products.map((product, index) => (
          <Box
            key={product.id}
            tabIndex={0}
            onTouchStart={() => setTouchActiveId(product.id)}
            onTouchEnd={() => setTimeout(() => setTouchActiveId((cur) => (cur === product.id ? null : cur)), 800)}
            className={touchActiveId === product.id ? 'touchActive' : undefined}
            sx={{
              width: 250,
              mt: 4,
              position: 'relative',
              cursor: 'pointer',
              outline: 'none',
              animation: `${fadeInUp} 0.5s ease-out ${index * 0.08}s both`,
              '&:hover .productImage': {
                transform: 'scale(1.06)',
              },
              '&:hover .cardOverlay, &:focus-visible .cardOverlay, &.touchActive .cardOverlay': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            }}
          >
            <Box
              sx={{
                width: '100%',
                aspectRatio: '6 / 7',
                overflow: 'hidden',
                position: 'relative',
                animation: `${curtainReveal} 0.9s ease ${index * 0.08}s both`,
              }}
            >
              {/* 진입 애니메이션(zoomOut)이 transform을 계속 점유해서 호버 확대가 안 먹던 문제 방지용으로
                  진입 애니메이션은 이 래퍼가, 호버 확대는 안쪽 img가 각각 따로 담당하게 분리 */}
              <Box sx={{ width: '100%', height: '100%', animation: `${zoomOut} 1.4s ease-out ${index * 0.08}s both` }}>
                <Box
                  component="img"
                  className="productImage"
                  src={`${import.meta.env.BASE_URL}${product.image}`}
                  alt={product.name}
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                  sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: '#EDECE7',
                    objectFit: 'cover',
                    willChange: 'transform',
                    transition: 'transform 0.35s ease',
                  }}
                />
              </Box>
              {/* 호버/포커스 시 올라오는 정보 오버레이 */}
              <Box
                className="cardOverlay"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'flex-end',
                  p: 1.5,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0) 60%)',
                  opacity: 0,
                  transform: 'translateY(6px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  pointerEvents: 'none',
                }}
              >
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: 'white', letterSpacing: -0.3 }}>
                  자세히 보기 →
                </Typography>
              </Box>
            </Box>
            {index < 3 && (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: 36,
      height: 36,
      bgcolor: 'black',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: 28,
    }}
  >
    {index + 1}
  </Box>
)}
            <Typography
              sx={{
                fontSize: 15,
                mt: 1,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.25 }}>
              {product.discountPercent && (
                <Typography sx={{ fontSize: 15, fontWeight: 600, color: 'discount.main' }}>
                  {product.discountPercent}%
                </Typography>
              )}
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{formatPrice(product.price)}</Typography>
              {product.originalPrice && (
                <Typography
                  sx={{ fontSize: 13, fontWeight: 500, color: 'originalPrice.main', textDecoration: 'line-through' }}
                >
                  {formatPrice(product.originalPrice)}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
            {index < 3 && (
              <Chip
                label="BEST"
                size="small"
                sx={{
                  bgcolor: 'discount.main',
                  color: 'white',
                  height: 18,
                  fontSize: 10,
                  fontWeight: 500,
                  '& .MuiChip-label': { px: 0.75 },
                }}
              />
            )}
            {product.isNew && (
              <Chip
                label="NEW"
                size="small"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  height: 18,
                  fontSize: 10,
                  fontWeight: 500,
                  '& .MuiChip-label': { px: 0.75 },
                }}
              />
            )}
            </Box>
          </Box>
        ))}
      </Box>

      <ButtonBase
        ref={magnetRef}
        onMouseMove={handleMagnetMove}
        onMouseLeave={handleMagnetLeave}
        sx={{
          display: 'block',
          mx: 'auto',
          mt: '150px',
          px: 3,
          py: 1,
          border: '1.5px solid #a7aaab',
          willChange: 'transform',
          transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.2s ease, background-color 0.2s ease, background-image 0.3s ease',
          '&:hover, &:focus-visible': {
            borderColor: 'primary.main',
            backgroundImage: 'linear-gradient(135deg, #cdeee0, #7fc9ae)',
          },
          '&:hover .viewMoreLabel, &:focus-visible .viewMoreLabel': {
            color: 'white',
          },
          '& .MuiTouchRipple-child': {
            backgroundColor: 'white',
          },
        }}
      >
        <Typography className="viewMoreLabel" sx={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5, transition: 'color 0.2s ease' }}>
          VIEW MORE
        </Typography>
      </ButtonBase>
    </Box>
  )
}

export default BestSeller
