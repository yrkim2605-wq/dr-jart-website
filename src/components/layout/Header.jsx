import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined'

const ANNOUNCEMENTS = [
  '닥터자르트 카카오 채널 추가 시, 추가 10% 할인 코드 발급! 바로가기',
  '공식몰 회원, 전제품 20% 할인 + 무료배송 + BEST 샘플 증정! 바로가기',
  '구매금액별 사은품 증정(6만 원 이상 - 곰돌이 액정클리너 키링 증정) 바로가기',
  '첫 구매, 상시 20% + 추가 10% OFF! (할인 코드: WELCOME) 혜택받기'
]

const arrowSx = {
  fontSize: { xs: 18, md: 24 },
  fontWeight: 100,
  color: 'white',
  bgcolor: 'transparent',
  border: 0,
  cursor: 'pointer',
  lineHeight: 1,
  p: 0,
}

const navLinkSx = {
  fontSize: 17,
  fontWeight: 500,
  color: 'inherit',
  textDecoration: 'none',
  display: 'inline-block',
  transition: 'color 0.2s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
  '&:hover': {
    color: 'primary.main',
  },
}

const handleNavMagnetMove = (e) => {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  const relX = e.clientX - rect.left - rect.width / 2
  const relY = e.clientY - rect.top - rect.height / 2
  el.style.transform = `translate(${relX * 0.3}px, ${relY * 0.5}px)`
}

const handleNavMagnetLeave = (e) => {
  e.currentTarget.style.transform = 'translate(0px, 0px)'
}

const iconLinkSx = {
  display: 'flex',
  color: 'inherit',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: 'primary.main',
  },
}

const Header = ({ stickyVisible = false }) => {
  const [announcementIndex, setAnnouncementIndex] = useState(0)
  const [isBannerVisible, setIsBannerVisible] = useState(true)

  const showPrevAnnouncement = () => {
    setAnnouncementIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)
  }
  const showNextAnnouncement = () => {
    setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)
  }

  return (
    <>
      {/* 세 번째 섹션부터 다시 보이는 고정 헤더 */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          bgcolor: 'white',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          transform: stickyVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.35s ease',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          py: 2,
          px: 4.5,
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: 26, color: 'black', justifySelf: 'start' }}>Dr.jart+</Typography>
        <Box sx={{ display: 'flex', gap: 4, justifySelf: 'center' }}>
          <Typography component="a" href="#" onMouseMove={handleNavMagnetMove} onMouseLeave={handleNavMagnetLeave} sx={{ ...navLinkSx, fontSize: 14 }}>PRODUCTS</Typography>
          <Typography component="a" href="#" onMouseMove={handleNavMagnetMove} onMouseLeave={handleNavMagnetLeave} sx={{ ...navLinkSx, fontSize: 14 }}>LAB</Typography>
          <Typography component="a" href="#" onMouseMove={handleNavMagnetMove} onMouseLeave={handleNavMagnetLeave} sx={{ ...navLinkSx, fontSize: 14 }}>BRAND</Typography>
          <Typography component="a" href="#" onMouseMove={handleNavMagnetMove} onMouseLeave={handleNavMagnetLeave} sx={{ ...navLinkSx, fontSize: 14 }}>SEARCH</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, justifySelf: 'end' }}>
          <Box component="a" href="#" aria-label="장바구니" sx={iconLinkSx}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 22 }} />
          </Box>
          <Box component="a" href="#" aria-label="로그인" sx={iconLinkSx}>
            <PersonOutlineIcon sx={{ fontSize: 22 }} />
          </Box>
        </Box>
      </Box>

      <Box component="header">
      <Collapse in={isBannerVisible}>
        <Box sx={{ bgcolor: 'black', color: 'white', display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
          <Box
            sx={{
              flex: 1,
              maxWidth: 1440,
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 1.5, sm: 3, md: '400px' },
          }}
        >
          <Typography component="button" onClick={showPrevAnnouncement} aria-label="이전 안내" sx={arrowSx}>
            ‹
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 11, sm: 12, md: 13 },
              width: { xs: 200, sm: 320, md: 480 },
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
      </Collapse>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', pt: 5, px: 4.5 }}>
        <Typography variant="h1" sx={{ fontWeight: 700, fontSize: 50, margin: 0, color: 'black', justifySelf: 'start' }}>Dr.jart+</Typography>
        <Box sx={{ display: 'flex', gap: 5, justifySelf: 'center' }}>
          <Typography component="a" href="#" onMouseMove={handleNavMagnetMove} onMouseLeave={handleNavMagnetLeave} sx={navLinkSx}>PRODUCTS</Typography>
          <Typography component="a" href="#" onMouseMove={handleNavMagnetMove} onMouseLeave={handleNavMagnetLeave} sx={navLinkSx}>LAB</Typography>
          <Typography component="a" href="#" onMouseMove={handleNavMagnetMove} onMouseLeave={handleNavMagnetLeave} sx={navLinkSx}>BRAND</Typography>
          <Typography component="a" href="#" onMouseMove={handleNavMagnetMove} onMouseLeave={handleNavMagnetLeave} sx={navLinkSx}>SEARCH</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, justifySelf: 'end' }}>
          <Box component="a" href="#" aria-label="장바구니" sx={iconLinkSx}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 25 }} />
          </Box>
          <Box component="a" href="#" aria-label="로그인" sx={iconLinkSx}>
            <PersonOutlineIcon sx={{ fontSize: 25 }} />
          </Box>
        </Box>
      </Box>
      </Box>
    </>
  )
}

export default Header