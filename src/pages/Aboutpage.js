import React, { useEffect } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Detailedabout from '../sections/Detailedabout'

const Aboutpage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  return (

    <div>
        <Header/>
        <Detailedabout/>
        <Footer/>
    </div>
  )
}

export default Aboutpage