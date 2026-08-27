import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import Brand from './components/sections/Brand'
import SkinConcern from './components/sections/SkinConcern'
import BestSeller from './components/sections/BestSeller'
import ProductReview from './components/sections/ProductReview'
import  FeaturedProduct from './components/sections/FeaturedProduct'
import Footer from './components/layout/Footer'

import { useState } from 'react'

function App() {
  const [selectedConcern, setSelectedConcern] = useState('전체보기')

 return (
    <>
      <Header />
      <Hero />
      <Brand />
      <SkinConcern selectedConcern={selectedConcern} onSelectConcern={setSelectedConcern} />
      <BestSeller selectedConcern={selectedConcern} />
      <ProductReview />
      <FeaturedProduct />
      <Footer />
    </>
  )
}

export default App
