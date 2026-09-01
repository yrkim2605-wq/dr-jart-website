import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined'

const ANNOUNCEMENTS = [
  '닥터자르트 카카오 채널 추가 시, 추가 10% 할인 코드 발급! 바로가기',
  '공식몰 회원, 전제품 20% 할인 + 무료배송 + BEST 샘플 증정! 바로가기',
  '구매금액별 사은품 증정(6만 원 이상 - 곰돌이 액정클리너 키링 증정) 바로가기',
  '첫 구매, 상시 20% + 추가 10% OFF! (할인 코드: WELCOME) 혜택받기'
]

const arrowSx = {
  fontSize: 24,
  fontWeight: 100,
  color: 'white',
  bgcolor: 'transparent',
  border: 0,
  cursor: 'pointer',
  lineHeight: 1,
  p: 0,
}

const Header = () => {
  const [announcementIndex, setAnnouncementIndex] = useState(0)
  const [isBannerVisible, setIsBannerVisible] = useState(true)

  const showPrevAnnouncement = () => {
    setAnnouncementIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)
  }
  const showNextAnnouncement = () => {
    setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)
  }

  return (
    <Box component="header">
      {isBannerVisible && (
        <Box sx={{ bgcolor: 'black', color: 'white', display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
          <Box
            sx={{
              flex: 1,
              maxWidth: 1440,
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '400px',
          }}
        >
          <Typography component="button" onClick={showPrevAnnouncement} aria-label="이전 안내" sx={arrowSx}>
            ‹
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              width: 480,
              textAlign: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {ANNOUNCEMENTS[announcementIndex]}
          </Typography>
          <Typography component="button" onClick={showNextAnnouncement} aria-label="다음 안내" sx={arrowSx}>
            ›
          </Typography>
        </Box>
        <Typography component="button" onClick={() => setIsBannerVisible(false)} aria-label="닫기" sx={arrowSx}>
        ×
      </Typography>
      </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 5, px: 4.5 }}>
        <Typography variant="h1" sx={{ fontWeight: 700, fontSize: 33, margin: 0, color: 'black' }}>Dr.jart+</Typography>
        <Box sx={{ display: 'flex', gap: 5 }}>
          <Typography component="a" href="#" sx={{ fontSize: 15, fontWeight: 500, color: 'inherit', textDecoration: 'none' }}>PRODUCTS</Typography>
          <Typography component="a" href="#" sx={{ fontSize: 15, fontWeight: 500, color: 'inherit', textDecoration: 'none' }}>LAB</Typography>
          <Typography component="a" href="#" sx={{ fontSize: 15, fontWeight: 500, color: 'inherit', textDecoration: 'none' }}>BRAND</Typography>
          <Typography component="a" href="#" sx={{ fontSize: 15, fontWeight: 500, color: 'inherit', textDecoration: 'none' }}>SEARCH</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
          <Box component="a" href="#" aria-label="장바구니" sx={{ display: 'flex', color: 'inherit' }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 25 }} />
          </Box>
          <Box component="a" href="#" aria-label="로그인" sx={{ display: 'flex', color: 'inherit' }}>
            <PersonOutlineIcon sx={{ fontSize: 25 }} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Header