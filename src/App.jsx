import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import Brand from './components/sections/Brand'
import SkinConcern from './components/sections/SkinConcern'
import BestSeller from './components/sections/BestSeller'
import ProductReview from './components/sections/ProductReview'
import  FeaturedProduct from './components/sections/FeaturedProduct'
import Footer from './components/layout/Footer'
import Reveal from './components/common/Reveal'
import CustomCursor from './components/common/CustomCursor'
import Box from '@mui/material/Box'

import { useEffect, useRef, useState } from 'react'

function App() {
  const [selectedConcern, setSelectedConcern] = useState('전체보기')

  // 세 번째 섹션(SkinConcern) 시작 지점을 지나면 헤더가 다시 보이도록(sticky) 함.
  // 얇은 sentinel의 위치가 뷰포트 위(top < 0)로 넘어가면 "지나왔다"로 판단, 아래로 넘어가면(스크롤 위로) 다시 숨김
  const skinConcernSentinelRef = useRef(null)
  const [isStickyHeaderVisible, setIsStickyHeaderVisible] = useState(false)

  useEffect(() => {
    const el = skinConcernSentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsStickyHeaderVisible(entry.boundingClientRect.top < 0)
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

 return (
    <>
      <CustomCursor />
      <Header stickyVisible={isStickyHeaderVisible} />
      <Hero />
      <Reveal threshold={0.01}><Brand /></Reveal>
      <Box ref={skinConcernSentinelRef} />
      <Reveal>
        <SkinConcern selectedConcern={selectedConcern} onSelectConcern={setSelectedConcern} />
      </Reveal>
      <Reveal><BestSeller selectedConcern={selectedConcern} /></Reveal>
      <Reveal><ProductReview /></Reveal>
      <Reveal><FeaturedProduct /></Reveal>
      <Reveal><Footer /></Reveal>
    </>
  )
}

export default App
