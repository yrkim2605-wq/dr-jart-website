import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'

const MagnifierIcon = (props) => (
  <Box
    component="svg"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="17" cy="17" r="11" stroke="black" strokeWidth="3" />
    <circle cx="17" cy="17" r="7" stroke="black" strokeWidth="1" opacity="0.35" />
    <line x1="25.5" y1="25.5" x2="36" y2="36" stroke="black" strokeWidth="4" strokeLinecap="round" />
  </Box>
)

// width는 각 상품 사진의 실제 가로세로 비율 기준으로, 지름 112px 원의 대각선 안에
// 딱 들어오도록 계산한 값 (사진마다 비율이 달라서 하나의 % 값으로는 못 맞춤)
const CONCERNS = [
  { id: '전체보기', label: '전체보기', image: 'images/concerns/all.jpg', mode: 'cover' },
  { id: 'REDNESS', label: 'REDNESS', image: 'images/concerns/redness.png', mode: 'contain', width: 27, isNew: true },
  { id: 'DRYNESS', label: 'DRYNESS', image: 'images/concerns/dryness.png', mode: 'contain', width: 68 },
  { id: 'PORES', label: 'PORES', image: 'images/concerns/pores.png', mode: 'contain', width: 22 },
  { id: 'BARRIER', label: 'BARRIER', image: 'images/concerns/barrier.png', mode: 'contain', width: 27 },
]

const SkinConcern = ({ selectedConcern, onSelectConcern }) => {
  return (
    <Box component="section" sx={{ pt: 25 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
        <Typography sx={{ fontSize: 40, fontWeight: 500, textAlign: 'center' }}>
          What&apos;s your skin concern?
        </Typography>
        <MagnifierIcon sx={{ width: 32, height: 32, transform: 'scaleX(-1)' }} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 12 }}>
        {CONCERNS.map((concern) => (
          <ButtonBase
            key={concern.id}
            onClick={() => onSelectConcern(concern.id)}
            sx={{ textAlign: 'center', display: 'block' }}
          >
            <Box
              sx={{
                position: 'relative',
                width: 112,
                height: 112,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Box
                sx={{
                  width: 112,
                  height: 112,
                  borderRadius: '50%',
                  bgcolor: '#EDECE7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: concern.mode === 'cover' ? 'hidden' : 'visible',
                }}
              >
                <Box
                  component="img"
                  src={`${import.meta.env.BASE_URL}${concern.image}`}
                  alt={concern.label}
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                  sx={
                    concern.mode === 'cover'
                      ? { width: '100%', height: '100%', objectFit: 'cover' }
                      : { width: concern.width, height: 'auto', display: 'block' }
                  }
                />
              </Box>
              {concern.isNew && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 2,
                    right: 0,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  N
                </Box>
              )}
            </Box>
            <Typography sx={{ fontSize: 15, mt: 1, fontWeight: 500 }}>{concern.label}</Typography>
          </ButtonBase>
        ))}
      </Box>
    </Box>
  )
}

export default SkinConcern