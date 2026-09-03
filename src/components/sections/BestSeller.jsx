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

  const magnetRef = useRef(null)

  const handleMagnetMove = (e) => {
    const el = magnetRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${relX * 0.3}px, ${relY * 0.4}px)`
  }

  const handleMagnetLeave = () => {
    const el = magnetRef.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
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
            sx={{
              width: 250,
              mt: 4,
              position: 'relative',
              cursor: 'pointer',
              animation: `${fadeInUp} 0.5s ease-out ${index * 0.08}s both`,
              '&:hover .productImage': {
                transform: 'scale(1.06)',
              },
            }}
          >
            <Box
              sx={{
                width: '100%',
                aspectRatio: '6 / 7',
                overflow: 'hidden',
                animation: `${curtainReveal} 0.9s ease ${index * 0.08}s both`,
              }}
            >
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
                  transition: 'transform 0.35s ease',
                  animation: `${zoomOut} 1.4s ease-out ${index * 0.08}s both`,
                }}
              />
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
          transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.2s ease, background-color 0.2s ease',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'primary.main',
          },
          '&:hover .viewMoreLabel': {
            color: 'white',
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
