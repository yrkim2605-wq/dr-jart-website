import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'

const Hero = () => {
  return (
    <Box component="section" sx={{ position: 'relative', minHeight: 900, pl: '50px' }}>
      <Typography sx={{ fontSize: 150, fontWeight: 800 }}>Dr.</Typography>

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          height: 321,
        }}
      >
        <Box
          component="img"
          src={`${import.meta.env.BASE_URL}images/hero-product.png`}
          alt="시카페어 수딩 컬러 코렉팅 트리트먼트"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(20px 20px 15px rgba(0, 0, 0, 0.25))',
          }}
        />

        {/* 쿨소닉 테크놀로지 안내 문구 + 연결선 (왼쪽, 가로→대각선→가로) */}
        <Typography
          sx={{
            position: 'absolute',
            top: 5,
            left: -245,
            width: 150,
            fontSize: 13,
            lineHeight: 1.2,
            textAlign: 'left',
          }}
        >
          쿨소닉 테크놀로지가
          <br />
          결합된 CICAPAIR
        </Typography>
        <Box
          component="svg"
          width={216}
          height={110}
          sx={{ position: 'absolute', top: 0, left: -245, overflow: 'visible' }}
        >
          <polyline points="0,48 139,48 162,106 216,106" fill="none" stroke="black" strokeWidth="1" />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 96,
            left: -29,
            width: 16,
            height: 15,
            border: '1.5px solid black',
            bgcolor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: 6, height: 6, bgcolor: 'black' }} />
        </Box>

        {/* 1회 사용 효과 안내 문구 + 연결선 (오른쪽, 잡 쪽 가로 → 대각선 → 텍스트) */}
        <Typography
          sx={{
            position: 'absolute',
            top: 192,
            left: 365,
            width: 180,
            fontSize: 13,
            lineHeight: 1.2,
            textAlign: 'right',
          }}
        >
          1회 사용으로 민감해진
          <br />
          피부를 빠르게 진정
        </Typography>
        <Box
          component="svg"
          width={190}
          height={285}
          sx={{ position: 'absolute', top: 0, left: 351, overflow: 'visible' }}
        >
          <polyline points="0,285 16,285 40,238 190,238" fill="none" stroke="black" strokeWidth="1" />
        </Box>
      </Box>

      {/* 오른쪽 세로 사이드바: + + | CICAPAIR+ FORMULA 01 REDNESS CARE */}
      <Box sx={{ position: 'absolute', top: 110, right: 220, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ width: '3px', height: 110, bgcolor: 'black', mt: '-15px' }} />
          <Box sx={{ width: '1px', height: 400, bgcolor: 'secondary.main' }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box sx={{ height: 34, overflow: 'visible', transform: 'translateY(-15px)' }}>
            <AddIcon sx={{ fontSize: 40, color: '#d9d9d9', stroke: 'currentColor', strokeWidth: 2.5, display: 'block' }} />
            <AddIcon sx={{ fontSize: 40, color: '#d9d9d9', stroke: 'currentColor', strokeWidth: 2.5, display: 'block' }} />
          </Box>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: 1,
              lineHeight: 1.2,
              color: 'secondary.main',
              writingMode: 'vertical-rl',
              mt: '45px',
            }}
          >
            CICAPAIR+
            <br />
            FORMULA 01
            <br />
            REDNESS CARE
          </Typography>
        </Box>
      </Box>

      {/* 왼쪽 하단 브랜드 태그라인 */}
      <Box sx={{ position: 'absolute', left: '50px', bottom: 80 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 500 }}>Dr.Jart+</Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 500, mt: 3 }}>
          KOREAN SKIN BARRIER EXPERTS.
          <br />
          DREAM INSPIRED. ARTFULLY DELIVERED.
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: 150,
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