import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'

const SkinConcern = ({ selectedConcern, onSelectConcern }) => {
  return (
    <Box component="section" sx={{ pt: 25 }}>
      <Typography sx={{ fontSize: 40, fontWeight: 500, textAlign: 'center' }}>
        What&apos;s your skin concern?
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 12 }}>
      <ButtonBase onClick={() => onSelectConcern('전체보기')} sx={{ textAlign: 'center', display: 'block' }}>
  <Box
  sx={{
    width: 100,
    height: 100,
    borderRadius: '50%',
    bgcolor: '#EDECE7',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  }}
/>
  <Typography sx={{ fontSize: 15, mt: 1 }}>전체보기</Typography>
</ButtonBase>

        <ButtonBase onClick={() => onSelectConcern('REDNESS')} sx={{ textAlign: 'center', display: 'block' }}>
          <Box
  sx={{
    width: 100,
    height: 100,
    borderRadius: '50%',
    bgcolor: '#EDECE7',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  }}
/>
          <Typography sx={{ fontSize: 15, mt: 1 }}>REDNESS</Typography>
        </ButtonBase>

        <ButtonBase onClick={() => onSelectConcern('DRYNESS')} sx={{ textAlign: 'center', display: 'block' }}>
          <Box
  sx={{
    width: 100,
    height: 100,
    borderRadius: '50%',
    bgcolor: '#EDECE7',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  }}
/>
          <Typography sx={{ fontSize: 15, mt: 1 }}>DRYNESS</Typography>
        </ButtonBase>

        <ButtonBase onClick={() => onSelectConcern('PORES')} sx={{ textAlign: 'center', display: 'block' }}>
          <Box
  sx={{
    width: 100,
    height: 100,
    borderRadius: '50%',
    bgcolor: '#EDECE7',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  }}
/>
          <Typography sx={{ fontSize: 15, mt: 1 }}>PORES</Typography>
        </ButtonBase>

        <ButtonBase onClick={() => onSelectConcern('BARRIER')} sx={{ textAlign: 'center', display: 'block' }}>
          <Box
  sx={{
    width: 100,
    height: 100,
    borderRadius: '50%',
    bgcolor: '#EDECE7',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  }}
/>
          <Typography sx={{ fontSize: 15, mt: 1 }}>BARRIER</Typography>
        </ButtonBase>
      </Box>
    </Box>
  )
}

export default SkinConcern