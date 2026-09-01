import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Brand = () => {
  return (
    <Box
      component="section" sx={{
    position: 'relative',
    backgroundImage: `url(${import.meta.env.BASE_URL}images/brand-photo.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    minHeight: 800,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }}
>
      {/* 좌상단 로고 */}
      <Typography sx={{ position: 'absolute', top: 32, left: 40, fontSize: 33, fontWeight: 700 }}>
        Dr.jart+
      </Typography>

      {/* 우상단 랩 정보 */}
      <Box sx={{ position: 'absolute', top: 32, right: 40, textAlign: 'right' }}>
        <Typography sx={{ fontSize: 14 , fontWeight: 600 }}>LAB 01</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 600, mt: 5 }}>DERMATOLOGY</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 600, mt: 2 }}>SKIN ANALYSIS</Typography>
      </Box>

      {/* 좌하단 포뮬러 정보 */}
      <Box sx={{ position: 'absolute', bottom: 32, left: 40 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>FORMULA 01</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>SKIN RESEARCH</Typography>
      </Box>

      {/* 우하단 십자가 */}
      <Typography sx={{ position: 'absolute', bottom: 24, right: 40, fontSize: 24, fontWeight: 300 }}>
        +
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, pt: 10 }}>
  <Box sx={{ textAlign: 'center' }}>
    <Typography sx={{ fontSize: 36, fontWeight: 700 }}>Dr</Typography>
    <Typography sx={{ fontSize: 15, fontWeight: 500 }}>이성</Typography>
  </Box>
  <Box sx={{ textAlign: 'center' }}>
    <Typography sx={{ fontSize: 36, fontWeight: 700 }}>+</Typography>
  </Box>
  <Box sx={{ textAlign: 'center' }}>
    <Typography sx={{ fontSize: 36, fontWeight: 700 }}>J</Typography>
    <Typography sx={{ fontSize: 15, fontWeight: 500 }}>join<br /> junction</Typography>
  </Box>
  <Box sx={{ textAlign: 'center' }}>
    <Typography sx={{ fontSize: 36, fontWeight: 700 }}>+</Typography>
  </Box>
  <Box sx={{ textAlign: 'center' }}>
    <Typography sx={{ fontSize: 36, fontWeight: 700 }}>art</Typography>
    <Typography sx={{ fontSize: 15, fontWeight: 500 }}>감성</Typography>
  </Box>
  
</Box>

<Box sx={{ textAlign: 'center', mt: 6 }}>
  <Typography sx={{ fontSize: 48, fontWeight: 700 }}>
    &apos;Doctor Joins Art&apos;{' '}
    <Box component="span" sx={{ color: 'primary.main' }}>
      의학과 예술의 만남
    </Box>
  </Typography>
</Box>
    </Box>
  )
}

export default Brand