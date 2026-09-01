import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import FacebookIcon from '@mui/icons-material/Facebook'
import XIcon from '@mui/icons-material/X'

const SOCIAL_LINKS = [
  { id: 'instagram', label: '인스타그램', Icon: InstagramIcon, href: '#' },
  { id: 'youtube', label: '유튜브', Icon: YouTubeIcon, href: '#' },
  { id: 'facebook', label: '페이스북', Icon: FacebookIcon, href: '#' },
  { id: 'x', label: 'X', Icon: XIcon, href: '#' },
]

// 오른쪽 제품 사진(Cryo Rubber 노랑/파랑)이 도착하기 전까지는 어두운 회색 박스로 표시됨
const MASK_PRODUCTS = [
  { id: 'mask-1', image: 'images/footer/mask-1.avif' },
  { id: 'mask-2', image: 'images/footer/mask-2.webp' },
]

const LEGAL_LINES = [
  '개인정보처리방침',
  '서울시 강남구 강남대로 382 메리츠타워 19층 대표이사 : KIM YE JIN (김예진)',
  '상호명 : 해브앤비 유한회사 사업자 등록번호 : 214-63681 통신판매업 신고번호 : 2008 서울 강남-2284호 사업자 정보 확인',
  '고객만족센터 : 1544-5453 (운영시간 : 09:00~18:00, 점심시간 : 12:50~14:00 ) FAX : 02-3462-9051',
  '현재 고객만족센터 유선 연결이 원활하지 않아, 빠른 문의 응대를 위해 전자우편 주소로 연락 부탁드립니다',
  '전자우편주소 : webmaster@drjart.com',
]

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'black', color: 'white', mt: 20 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 6, px: 6, pt: 10, pb: 8 }}>
        <Box sx={{ maxWidth: 640, display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontSize: 150, fontWeight: 900, lineHeight: 1 }}>MASK</Typography>
          <Typography sx={{ fontSize: 40, fontWeight: 900, lineHeight: 1.3, mt: 1 }}>
            <Box component="span" sx={{ display: 'block' }}>피부고민별 피부타입을</Box>
            <Box component="span" sx={{ display: 'block' }}>위한 혁신적인 마스크</Box>
          </Typography>

          <Typography sx={{ fontSize: 13, fontWeight: 400, color: 'white', mt: 4 }}>
            닥터자르트의 독창적인 마스크를 만나보세요.
          </Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 400, color: 'white', lineHeight: 1.6, mt: 1 }}>
            <Box component="span" sx={{ display: 'block' }}>건조함, 민감함, 푸석함 등</Box>
            <Box component="span" sx={{ display: 'block' }}>피부고민별 맞춤 케어를 경험해보세요.</Box>
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
            {SOCIAL_LINKS.map(({ id, label, Icon, href }) => (
              <ButtonBase
                key={id}
                component="a"
                href={href}
                aria-label={label}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 1.5,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                }}
              >
                <Icon sx={{ fontSize: 20 }} />
              </ButtonBase>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 3 }}>
          {MASK_PRODUCTS.map((product) => (
            <Box
              key={product.id}
              sx={{
                width: 360,
                aspectRatio: '3 / 4',
                bgcolor: '#1A1A1A',
                ...(product.image && {
                  backgroundImage: `url(${import.meta.env.BASE_URL}${product.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }),
              }}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 4, px: 6, mt: 10, pb: 6 }}>
        <Typography sx={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
          Copyright @ Hve & Be co., Ltd. All rights reserved.
        </Typography>

        <Box sx={{ maxWidth: 700 }}>
          {LEGAL_LINES.map((line) => (
            <Typography
              key={line}
              sx={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.6)', mt: 0 }}
            >
              {line}
            </Typography>
          ))}
        </Box>
      </Box>

      <Box sx={{ overflow: 'hidden', bgcolor: 'white' }}>
        <Typography
          sx={{
            fontSize: '27.8vw',
            fontWeight: 900,
            lineHeight: 1,
            textAlign: 'left',
            color: 'black',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.02em',
            ml: '-0.03em',
            transform: 'translate(-34px, -75px)',
          }}
        >
          Dr.jart+
        </Typography>
      </Box>

      <ButtonBase
        onClick={scrollToTop}
        aria-label="맨 위로 이동"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          width: 56,
          height: 56,
          borderRadius: '50%',
          bgcolor: '#C4C4C4',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.2,
          zIndex: 1000,
          boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
        }}
      >
        <Box component="svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ width: 20, height: 20 }}>
          {/* 뚜껑 */}
          <rect x="9" y="1.8" width="6" height="1.6" rx="0.6" fill="white" />
          {/* 목 + 삼각 몸체 외곽선 */}
          <path
            d="M10 3.4 V8 L4.2 19 Q4 20 5.2 20 H18.8 Q20 20 19.8 19 L14 8 V3.4"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
          />
          {/* 액체 */}
          <path
            d="M6.9 14 H17.1 L19.2 18.6 Q19.6 19.4 18.6 19.4 H5.4 Q4.4 19.4 4.8 18.6 Z"
            fill="white"
          />
          {/* 액체 속 기포 (배경색으로 뚫어서 표현) */}
          <circle cx="9.3" cy="16.3" r="0.7" fill="#C4C4C4" />
          <circle cx="12.6" cy="17.6" r="1" fill="#C4C4C4" />
          <circle cx="11" cy="15" r="0.5" fill="#C4C4C4" />
          {/* 맑은 부분에 떠 있는 기포 */}
          <circle cx="11.3" cy="11" r="0.55" fill="white" />
          <circle cx="12.8" cy="12.3" r="0.4" fill="white" />
        </Box>
        <Typography sx={{ fontSize: 9, fontWeight: 700, color: 'white', letterSpacing: 0.5 }}>TOP</Typography>
      </ButtonBase>
    </Box>
  )
}

export default Footer
