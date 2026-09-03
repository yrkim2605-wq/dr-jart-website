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

import { useState } from 'react'

function App() {
  const [selectedConcern, setSelectedConcern] = useState('전체보기')

 return (
    <>
      <CustomCursor />
      <Header />
      <Hero />
      <Reveal threshold={0.01}><Brand /></Reveal>
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
