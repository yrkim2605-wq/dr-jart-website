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

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'black', color: 'white', mt: 30 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 6, px: 6, pt: 10, pb: 8 }}>
        <Box sx={{ maxWidth: 640, display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontSize: 40, fontWeight: 900 }}>MASK</Typography>
          <Typography sx={{ fontSize: 40, fontWeight: 900, lineHeight: 1.3, mt: 1 }}>
            <Box component="span" sx={{ display: 'block' }}>피부고민별 피부타입을</Box>
            <Box component="span" sx={{ display: 'block' }}>위한 혁신적인 마스크</Box>
          </Typography>

          <Typography sx={{ fontSize: 13, fontWeight: 400, color: 'white', mt: 4, pl: 32 }}>
            닥터자르트의 독창적인 마스크를 만나보세요.
          </Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 400, color: 'white', lineHeight: 1.6, mt: 1, pl: 26 }}>
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
              sx={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.6)', mt: 0.75 }}
            >
              {line}
            </Typography>
          ))}
        </Box>
      </Box>

      <Box sx={{ overflow: 'hidden', bgcolor: 'white' }}>
        <Typography sx={{ fontSize: 410, fontWeight: 900, textAlign: 'center', color: 'black' }}>
          Dr.jart+
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer
