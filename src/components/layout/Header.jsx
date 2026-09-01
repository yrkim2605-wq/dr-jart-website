import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

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
  return (
    <Box component="header">
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
          <Typography component="button" aria-label="이전 안내" sx={arrowSx}>
            ‹
          </Typography>
          <Typography sx={{ fontSize: 13 }}>닥터자르트 카카오 채널 추가 시, 추가 10% 할인 코드 발급! 바로가기</Typography>
          <Typography component="button" aria-label="다음 안내" sx={arrowSx}>
            ›
          </Typography>
        </Box>
        <Typography component="button" aria-label="닫기" sx={arrowSx}>
          ×
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 5, px: 4.5 }}>
        <Typography variant="h1" sx={{ fontWeight: 700, fontSize: 33, margin: 0 }}>Dr.jart+</Typography>
        <Box sx={{ display: 'flex', gap: 5 }}>
          <Typography component="a" href="#" sx={{ fontSize: 15, fontWeight: 500, color: 'inherit', textDecoration: 'none' }}>PRODUCTS</Typography>
          <Typography component="a" href="#" sx={{ fontSize: 15, fontWeight: 500, color: 'inherit', textDecoration: 'none' }}>LAB</Typography>
          <Typography component="a" href="#" sx={{ fontSize: 15, fontWeight: 500, color: 'inherit', textDecoration: 'none' }}>BRAND</Typography>
          <Typography component="a" href="#" sx={{ fontSize: 15, fontWeight: 500, color: 'inherit', textDecoration: 'none' }}>SEARCH</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Typography component="a" href="#" sx={{ fontSize: 15, fontWeight: 500, color: 'inherit', textDecoration: 'none' }}>CART</Typography>
          <Typography component="a" href="#" sx={{ fontSize: 15, fontWeight: 500, color: 'inherit', textDecoration: 'none' }}>LOGIN</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Header