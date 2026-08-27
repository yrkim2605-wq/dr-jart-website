import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Brand = () => {
  return (
    <Box
      component="section" sx={{
    bgcolor: '#3A3A38',
    color: 'white',
    minHeight: 800,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }}
>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, pt: 10 }}>
  <Box sx={{ textAlign: 'center' }}>
    <Typography sx={{ fontSize: 48, fontWeight: 800 }}>Dr</Typography>
    <Typography sx={{ fontSize: 15 }}>이성</Typography>
  </Box>
  <Box sx={{ textAlign: 'center' }}>
    <Typography sx={{ fontSize: 48, fontWeight: 800 }}>+</Typography>
  </Box>
  <Box sx={{ textAlign: 'center' }}>
    <Typography sx={{ fontSize: 48, fontWeight: 800 }}>J</Typography>
    <Typography sx={{ fontSize: 15 }}>join<br /> junction</Typography>
  </Box>
  <Box sx={{ textAlign: 'center' }}>
    <Typography sx={{ fontSize: 48, fontWeight: 800 }}>+</Typography>
  </Box>
  <Box sx={{ textAlign: 'center' }}>
    <Typography sx={{ fontSize: 48, fontWeight: 800 }}>art</Typography>
    <Typography sx={{ fontSize: 15 }}>감성</Typography>
  </Box>
  
</Box>

<Box sx={{ textAlign: 'center', mt: 6 }}>
  <Typography sx={{ fontSize: 32, fontWeight: 700 }}>&apos;Doctor Joins Art&apos; 의학과 예술의 만남</Typography>
</Box>
    </Box>
  )
}

export default Brand