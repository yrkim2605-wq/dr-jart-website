import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const FeaturedProduct = () => {
  return (
    <Box component="section" sx={{ pt: 60 }}>
      <Typography sx={{ fontSize: 40, fontWeight: 500, textAlign: 'center' }}>
      FEATURED PRODUCT
      </Typography>
      <Box sx={{ aspectRatio: '21 / 9', bgcolor: '#EDECE7', mt: 6 }} />
    </Box>
  )
}

export default FeaturedProduct
