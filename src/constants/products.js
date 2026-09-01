// key는 SkinConcern 섹션의 onSelectConcern에서 넘기는 값과 동일해야 함
// 제품명/가격은 마켓컬리(kurly.com)·SSG·CHICOR에 등록된 닥터자르트 실제 판매 페이지 기준
// (판매처·시기·할인율에 따라 가격은 달라질 수 있음)
// image는 위 판매 페이지에서 받아와 public/images/products/에 저장해둔 로컬 파일 (핫링크 아님)

export const BEST_SELLER_PRODUCTS = {
  전체보기: [
    {
      id: 'all-1',
      name: '시카페어 인텐시브 수딩 리페어 크림 50ml',
      price: 47500,
      originalPrice: 50000,
      discountPercent: 5,
      image:
        'images/products/all-1.jpg',
    },
    {
      id: 'all-2',
      name: '세라마이딘 스킨 베리어 모이스처라이징 크림 50ml',
      price: 47500,
      originalPrice: 50000,
      discountPercent: 5,
      image:
        'images/products/all-2.jpg',
    },
    {
      id: 'all-3',
      name: '바이탈 하이드라 솔루션 하이드로 플럼프 워터 크림 50ml',
      price: 26600,
      originalPrice: 38000,
      discountPercent: 30,
      isNew: true,
      image:
        'images/products/all-3.jpg',
    },
    {
      id: 'all-4',
      name: '크라이오 러버 모이스처 마스크 + 스틱 앰플',
      price: 16150,
      originalPrice: 17000,
      discountPercent: 5,
      isNew: true,
      image:
        'images/products/all-4.jpg',
    },
  ],
  // 시카페어 = 진정/붉은기 케어 라인 → 붉은기(REDNESS) 컨선에 매칭
  REDNESS: [
    {
      id: 'redness-1',
      name: '시카페어 인텐시브 수딩 리페어 크림 50ml',
      price: 47500,
      originalPrice: 50000,
      discountPercent: 5,
      image:
        'images/products/redness-1.jpg',
    },
    {
      id: 'redness-2',
      name: '시카페어 인텐시브 수딩 리페어 세럼 30ml',
      price: 34300,
      originalPrice: 49000,
      discountPercent: 30,
      image:
        'images/products/redness-2.jpg',
    },
    {
      id: 'redness-3',
      name: '시카페어 더 수딩 시카 밸류 트리오 (크림 50ml+14ml)',
      price: 35000,
      originalPrice: 50000,
      discountPercent: 30,
      isNew: true,
      image:
        'images/products/redness-3.jpg',
    },
    {
      id: 'redness-4',
      name: '시카페어 수딩 리페어 세럼 마스크 1매',
      price: 4000,
      originalPrice: null,
      discountPercent: null,
      isNew: true,
      image:
        'images/products/redness-4.jpg',
    },
  ],
  // 바이탈 하이드라 솔루션 = 수분/보습 라인 → 건조(DRYNESS) 컨선에 매칭
  DRYNESS: [
    {
      id: 'dryness-1',
      name: '바이탈 하이드라 솔루션 하이드로 플럼프 워터 크림 50ml',
      price: 26600,
      originalPrice: 38000,
      discountPercent: 30,
      image:
        'images/products/dryness-1.jpg',
    },
    {
      id: 'dryness-2',
      name: '바이탈 하이드라 솔루션 하이드로 플럼프 트리트먼트 에센스 150ml',
      price: 34200,
      originalPrice: 36000,
      discountPercent: 5,
      image:
        'images/products/dryness-2.jpg',
    },
    {
      id: 'dryness-3',
      name: '바이탈 하이드라 솔루션 워터 젤리 스킨 세트 (크림 50ml+7ml)',
      price: 22800,
      originalPrice: 38000,
      discountPercent: 40,
      isNew: true,
      image:
        'images/products/dryness-3.jpg',
    },
    {
      id: 'dryness-4',
      name: '바이탈 하이드라 솔루션 하이드레이팅 립 마스크',
      price: 18848,
      originalPrice: 32000,
      discountPercent: 41,
      isNew: true,
      image: 'images/products/dryness-4.jpg',
    },
  ],
  // 닥터자르트 실제 '포어레미디(Pore Remedy)' 라인 (SSG.COM 신세계백화점 브랜드관, CHICOR 기준)
  PORES: [
    {
      id: 'pores-1',
      name: '포어레미디 파하 익스폴리에이팅 세럼',
      price: 31255,
      originalPrice: 32900,
      discountPercent: 5,
      image: 'images/products/pores-1.jpg',
    },
    {
      id: 'pores-2',
      name: '더마스크 포어레미디 퓨리파잉 머드 마스크 1매',
      price: 6400,
      originalPrice: 8000,
      discountPercent: 20,
      image: 'images/products/pores-2.jpg',
    },
    {
      id: 'pores-3',
      name: '더마스크 포어레미디 퓨리파잉 머드 마스크 5매입',
      price: 18240,
      originalPrice: 32000,
      discountPercent: 43,
      isNew: true,
      image: 'images/products/pores-3.jpg',
    },
    {
      id: 'pores-4',
      name: '포어레미디 리뉴잉 폼 클렌저 150ml',
      price: 18000,
      originalPrice: 30000,
      discountPercent: 40,
      isNew: true,
      image:
        'images/products/pores-4.jpg',
    },
  ],
  // 세라마이딘 = 세라마이드 기반 장벽 강화 라인 → 장벽(BARRIER) 컨선에 매칭
  BARRIER: [
    {
      id: 'barrier-1',
      name: '세라마이딘 스킨 베리어 모이스처라이징 크림 50ml',
      price: 47500,
      originalPrice: 50000,
      discountPercent: 5,
      image:
        'images/products/barrier-1.jpg',
    },
    {
      id: 'barrier-2',
      name: '세라마이딘 스킨 베리어 모이스처라이징 밀키 로션 50ml',
      price: 47500,
      originalPrice: 50000,
      discountPercent: 5,
      image:
        'images/products/barrier-2.jpg',
    },
    {
      id: 'barrier-3',
      name: '세라마이딘 크림-인퓨즈드 마스크 1매',
      price: 6600,
      originalPrice: 11000,
      discountPercent: 40,
      isNew: true,
      image: 'images/products/barrier-3.jpg',
    },
    {
      id: 'barrier-4',
      name: '세라마이딘 립밤 7ml',
      price: 16800,
      originalPrice: 21000,
      discountPercent: 20,
      isNew: true,
      image: 'images/products/barrier-4.jpg',
    },
  ],
}
