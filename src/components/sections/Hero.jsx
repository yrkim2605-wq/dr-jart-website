import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Hero = () => {
  return (
    <Box component="section" sx={{ position: 'relative', minHeight: 900}}>
      <Typography sx={{ fontSize: 120, fontWeight: 800 }}>Dr.</Typography>

      <Box
  sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    height: 260,
    bgcolor: '#EDECE7',
  }}
/>

      <Typography
        sx={{
          fontSize: 120,
          fontWeight: 800,
          position: 'absolute',
          right: 32,
          bottom: 32,
        }}
      >
        Jart+
      </Typography>
    </Box>
  )
}
export default Hero