import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import { BEST_SELLER_PRODUCTS } from '../../constants/products'
import Chip from '@mui/material/Chip'

const formatPrice = (price) => `${price.toLocaleString('ko-KR')}원`

const BestSeller = ({ selectedConcern }) => {
  const products = BEST_SELLER_PRODUCTS[selectedConcern] ?? []

  return (
    <Box component="section" sx={{ pt: 20 }}>
      <Typography sx={{ fontSize: 40, fontWeight: 500, textAlign: 'center' }}>
        BEST SELLER
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
        {products.map((product, index) => (
          <Box key={product.id} sx={{ width: 250, mt: 4, position: 'relative' }}>
            <Box
              component="img"
              src={`${import.meta.env.BASE_URL}${product.image}`}
              alt={product.name}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
              sx={{ width: '100%', aspectRatio: '6 / 7', bgcolor: '#EDECE7', objectFit: 'cover' }}
            />
            {index < 3 && (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: 36,
      height: 36,
      bgcolor: 'black',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: 28,
    }}
  >
    {index + 1}
  </Box>
)}
            <Typography
              sx={{
                fontSize: 15,
                mt: 1,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.25 }}>
              {product.discountPercent && (
                <Typography sx={{ fontSize: 15, fontWeight: 600, color: 'discount.main' }}>
                  {product.discountPercent}%
                </Typography>
              )}
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{formatPrice(product.price)}</Typography>
              {product.originalPrice && (
                <Typography
                  sx={{ fontSize: 13, fontWeight: 500, color: 'originalPrice.main', textDecoration: 'line-through' }}
                >
                  {formatPrice(product.originalPrice)}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
            {index < 3 && (
              <Chip
                label="BEST"
                size="small"
                sx={{
                  bgcolor: 'discount.main',
                  color: 'white',
                  height: 18,
                  fontSize: 10,
                  fontWeight: 500,
                  '& .MuiChip-label': { px: 0.75 },
                }}
              />
            )}
            {product.isNew && (
              <Chip
                label="NEW"
                size="small"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  height: 18,
                  fontSize: 10,
                  fontWeight: 500,
                  '& .MuiChip-label': { px: 0.75 },
                }}
              />
            )}
            </Box>
          </Box>
        ))}
      </Box>

      <ButtonBase
        sx={{
          display: 'block',
          mx: 'auto',
          mt: '150px',
          px: 3,
          py: 1,
          border: '1.5px solid #a7aaab',
        }}
      >
        <Typography sx={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.5 }}>VIEW MORE</Typography>
      </ButtonBase>
    </Box>
  )
}

export default BestSeller
