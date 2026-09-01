import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'

// image가 도착하기 전까지는 회색 박스로 표시됨
const BANNERS = [
  {
    id: 'banner-1',
    image: 'images/featured/banner-1.avif',
    eyebrow: '신제품 런칭 기념 30% OFF!',
    headline: ['오늘의 피부에 맞춘 클렌징 루틴', '촉촉한 딥클린 저자극 클렌징'],
    description: ['모공&각질 케어부터 수분 장벽 케어까지', '클렌징만으로 개선되는 피부 결을 느껴보세요'],
    cta: { type: 'button', label: 'SHOP NOW' },
  },
  {
    id: 'banner-2',
    image: 'images/featured/banner-2.avif',
    eyebrow: '30% OFF',
    headline: ['러버 마스크의 마법같은 피부 개선 효과에', '쿨링 효과를 더한 크라이오 러버!'],
    description: ['붓기 케어부터 쿨링까지!', '이젠 집에서 간편하게 러버 마스크하세요.'],
    cta: { type: 'button', label: 'SHOP NOW' },
  },
  {
    id: 'banner-3',
    image: 'images/featured/banner-3.webp',
    eyebrow: '30% OFF',
    headline: ['차오르는 수분감으로', '촉촉하게 빛나는 워터젤리 스킨'],
    description: [
      '차오르는 듯한 수분 충전으로',
      '촉촉하게 빛나는 워터젤리 스킨*을 경험해보세요',
      '(*하이드로-플럼프 시스템에 대한 내용)',
    ],
    cta: { type: 'button', label: 'SHOP NOW' },
  },
  {
    id: 'banner-4',
    image: 'images/featured/banner-4.webp',
    eyebrow: '30% OFF',
    headline: ['세라마이딘™&시카페어™', '탄탄보습&피부 진정 시너지케어'],
    cta: { type: 'links', items: ['시카페어™ 특가로 구매하기', '세라마이딘™ 특가로 구매하기'] },
  },
]

const SLIDE_INTERVAL_MS = 4000

const FeaturedProduct = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % BANNERS.length)
    }, SLIDE_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <Box component="section" sx={{ pt: 60 }}>
      <Typography sx={{ fontSize: 40, fontWeight: 500, textAlign: 'center' }}>
        FEATURED PRODUCT
      </Typography>

      <Box sx={{ position: 'relative', mt: 6, width: '100%', aspectRatio: '2.5 / 1', overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            transform: `translateX(-${activeIndex * 100}%)`,
            transition: 'transform 0.6s ease',
          }}
        >
          {BANNERS.map((banner) => (
            <Box
              key={banner.id}
              sx={{
                position: 'relative',
                flex: '0 0 100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#EDECE7',
                ...(banner.image && {
                  backgroundImage: `url(${import.meta.env.BASE_URL}${banner.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'top',
                }),
              }}
            >
              <Box sx={{ maxWidth: 560, pl: 12, pr: 6 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'text.primary', mb: 1.5 }}>
                  {banner.eyebrow}
                </Typography>
                <Typography sx={{ fontSize: 28, fontWeight: 700, lineHeight: 1.35, color: 'text.primary' }}>
                  {banner.headline.map((line) => (
                    <Box key={line} component="span" sx={{ display: 'block', whiteSpace: 'nowrap' }}>
                      {line}
                    </Box>
                  ))}
                </Typography>
                {banner.description && (
                  <Typography sx={{ fontSize: 13, fontWeight: 500, color: 'text.primary', mt: 2, lineHeight: 1.6 }}>
                    {banner.description.map((line) => (
                      <Box key={line} component="span" sx={{ display: 'block' }}>
                        {line}
                      </Box>
                    ))}
                  </Typography>
                )}

                {banner.cta.type === 'button' ? (
                  <ButtonBase
                    sx={{
                      display: 'block',
                      mt: 3,
                      px: 3,
                      py: 1.25,
                      bgcolor: 'black',
                    }}
                  >
                    <Typography sx={{ fontSize: 13, fontWeight: 700, color: 'white', letterSpacing: 0.5 }}>
                      {banner.cta.label}
                    </Typography>
                  </ButtonBase>
                ) : (
                  <Box sx={{ mt: 2 }}>
                    {banner.cta.items.map((item) => (
                      <Typography
                        key={item}
                        component="a"
                        href="#"
                        sx={{
                          display: 'block',
                          fontSize: 13,
                          fontWeight: 500,
                          color: 'text.primary',
                          textDecoration: 'underline',
                          mt: 0.5,
                        }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
        {BANNERS.map((banner, index) => (
          <ButtonBase
            key={banner.id}
            aria-label={`배너 ${index + 1}로 이동`}
            onClick={() => setActiveIndex(index)}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: index === activeIndex ? 'text.primary' : '#D9D9D9',
              transition: 'background-color 0.3s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default FeaturedProduct
