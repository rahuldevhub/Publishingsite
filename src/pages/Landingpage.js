import React from 'react'
import Header from '../components/header/Header'
import Hero from '../sections/Hero'
import Serviceweoffer from '../sections/Serviceweoffer'
import Packageoverview from '../sections/Packageoverview'
import Customizedpackage from '../sections/Customizedpackage'
import Contactus from '../sections/Contactus'
import FAQ from '../sections/FAQ'
import Footer from '../components/footer/Footer'



const Landingpage = () => {
  return (
  <div>
    <Header/>
    <Hero/>
    <Serviceweoffer/>
    <Packageoverview/>
   <Customizedpackage/>
   <Contactus/>
   <FAQ/>
   <Footer/>
  </div>
  )
}

export default Landingpage