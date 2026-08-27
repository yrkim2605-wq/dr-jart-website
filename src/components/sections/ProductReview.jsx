import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ProductReview = () => {
  return (
    <Box component="section" sx={{ pt: 60 }}>
      <Typography sx={{ fontSize: 40, fontWeight: 500, textAlign: 'center' }}>
      PRODUCT REVIEW
      </Typography>
       <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 6 }}>
        <Box sx={{ width: 200 }}>
  <Box sx={{ aspectRatio: '1 / 1', bgcolor: '#EDECE7' }} />
  <Typography sx={{ fontSize: 13, mt: 1, color: 'text.secondary' }}>yr***</Typography>
</Box>
  <Box sx={{ width: 200 }}>
    <Box sx={{ aspectRatio: '1 / 1', bgcolor: '#EDECE7' }} />
    <Typography sx={{ fontSize: 13, mt: 1, color: 'text.secondary' }}>pj***</Typography>
  </Box>
  <Box sx={{ width: 200 }}>
  <Box sx={{ aspectRatio: '1 / 1', bgcolor: '#EDECE7' }} />
  <Typography sx={{ fontSize: 13, mt: 1, color: 'text.secondary' }}>cb***</Typography>
</Box>
<Box sx={{ width: 200 }}>
  <Box sx={{ aspectRatio: '1 / 1', bgcolor: '#EDECE7' }} />
  <Typography sx={{ fontSize: 13, mt: 1, color: 'text.secondary' }}>yj***</Typography>
</Box>
</Box>
    </Box>
  )
}

export default ProductReview
