import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#B7E3D5', //포인트 컬러 민트
    },
    secondary: {
      main: '#A7AAAB' , //보조 컬러 COOL GRAY
    },
     text: {
    primary: '#111111', // 기본 컬러 BLACK
  },
  discount: {
    main: '#E9BDBD', // 할인 표시 색
  },
  originalPrice: {
    main: '#A7AAAB', // 원가 취소선 색
  },
},

  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 500,
    },
  },
  spacing: 8,
});

export default theme;
