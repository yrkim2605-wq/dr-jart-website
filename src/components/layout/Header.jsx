import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Header = () => {
  return (
    <Box component="header">
      <Box sx={{ bgcolor: 'black', color: 'white', textAlign: 'center', py: 1 }}>
        <Typography>닥터자르트 카카오 채널 추가 시, 추가 10% 할인 코드 발급! 바로가기</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h1">Dr.jart+</Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Typography component="a" href="#">PRODUCTS</Typography>
          <Typography component="a" href="#">LAB</Typography>
          <Typography component="a" href="#">BRAND</Typography>
          <Typography component="a" href="#">SEARCH</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Typography component="a" href="#">CART</Typography>
          <Typography component="a" href="#">LOGIN</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Header