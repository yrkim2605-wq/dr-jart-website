import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


const BestSeller = () => {
  return (
    <Box component="section" sx={{ pt: 20 }}>
      <Typography sx={{ fontSize: 40, fontWeight: 500, textAlign: 'center' }}>
      BEST SELLER
     </Typography>
     <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
     <Box sx={{ width: 250, mt: 4 }}>
  <Box sx={{ aspectRatio: '6 / 7', bgcolor: '#EDECE7' }} />
  <Typography sx={{ fontSize: 15, mt: 1 }}>시카페어 수딩 컬러 코렉팅 트리트먼트</Typography>
  <Typography sx={{ fontSize: 15, fontWeight: 600 }}>15,300원</Typography>
</Box>

<Box sx={{ width: 250, mt: 4 }}>
  <Box sx={{ aspectRatio: '6 / 7', bgcolor: '#EDECE7' }} />
  <Typography sx={{ fontSize: 15, mt: 1 }}>크라이오 수딩 마스크</Typography>
  <Typography sx={{ fontSize: 15, fontWeight: 600 }}>25,000원</Typography>
</Box>

<Box sx={{ width: 250, mt: 4 }}>
  <Box sx={{ aspectRatio: '6 / 7', bgcolor: '#EDECE7' }} />
  <Typography sx={{ fontSize: 15, mt: 1 }}>세라이딘 엑토인 인퓨즈드 ...</Typography>
  <Typography sx={{ fontSize: 15, fontWeight: 600 }}>25,000원</Typography>
</Box>

<Box sx={{ width: 250, mt: 4 }}>
  <Box sx={{ aspectRatio: '6 / 7', bgcolor: '#EDECE7' }} />
  <Typography sx={{ fontSize: 15, mt: 1 }}>퓨리쥬비네이션 퍼밍 바쿠치올 ...</Typography>
  <Typography sx={{ fontSize: 15, fontWeight: 600 }}>25,000원</Typography>
</Box>
</Box>

    </Box>
  )
}

export default BestSeller
