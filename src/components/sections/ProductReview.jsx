import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// image가 없는 리뷰는 사진 도착 전까지 회색 박스로 표시됨
const REVIEWS = [
  { id: 'yr', label: 'yr***', image: 'images/reviews/review-1.jpg' },
  { id: 'pj', label: 'pj***', image: 'images/reviews/review-2.jpg' },
  { id: 'cb', label: 'cb***', image: 'images/reviews/review-3.jpg' },
  { id: 'yj', label: 'yj***', image: 'images/reviews/review-4.png' },
  { id: 'sh', label: 'sh***', image: 'images/reviews/review-5.jpg' },
  { id: 'mj', label: 'mj***', image: 'images/reviews/review-6.jpg' },
]

// 무한 스크롤처럼 보이도록 리스트를 두 번 이어붙여서 절반(-50%) 지점에서 끊김 없이 반복
const STRIP_ITEMS = [...REVIEWS, ...REVIEWS]

const ProductReview = () => {
  return (
    <Box component="section" sx={{ pt: 24 }}>
      <Typography sx={{ fontSize: 36, fontWeight: 700, px: 4.5 }}>Dr.jart+</Typography>
      <Typography sx={{ fontSize: 40, fontWeight: 500, textAlign: 'center', mt: 15 }}>
        PRODUCT REVIEW
      </Typography>
      <Typography sx={{ fontSize: 15, fontWeight: 400, textAlign: 'center', color: 'text.primary', mt: 1.5 }}>
        수많은 고객들의 현실 리뷰
      </Typography>

      <Box sx={{ mt: 8, width: '100%', overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            width: 'max-content',
            animation: 'productReviewScroll 18s linear infinite',
            '@keyframes productReviewScroll': {
              from: { transform: 'translateX(0)' },
              to: { transform: 'translateX(-50%)' },
            },
          }}
        >
          {STRIP_ITEMS.map((review, index) =>
            review.image ? (
              <Box
                key={`${review.id}-${index}`}
                component="img"
                src={`${import.meta.env.BASE_URL}${review.image}`}
                alt={review.label}
                sx={{ height: 320, width: 'auto', flexShrink: 0, objectFit: 'cover', display: 'block' }}
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
