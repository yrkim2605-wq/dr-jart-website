import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Footer = () => {
  return (
    <Box component="footer">
      <Box sx={{ bgcolor: 'black', color: 'white', py: 6, textAlign: 'center' }}>
  <Typography sx={{ fontSize: 10 }}>
    고객만족센터: 1544-5453 (운영시간 09:00~18:00)
  </Typography>
</Box>

<Box sx={{ overflow: 'hidden' }}>
  <Typography sx={{ fontSize: 200, fontWeight: 900, textAlign: 'center' }}>
    Dr.jart+
  </Typography>
</Box>
    </Box>
  )
}

export default Footer
