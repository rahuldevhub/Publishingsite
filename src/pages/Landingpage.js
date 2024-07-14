import React from 'react'
import Hero from '../sections/Hero'
import Serviceweoffer from '../sections/Serviceweoffer'
import Packageoverview from '../sections/Packageoverview'
import Customizedpackage from '../sections/Customizedpackage'
import Contactus from '../sections/Contactus'
import FAQ from '../sections/FAQ'
import Aboutus from '../sections/Aboutus'

const Landingpage = () => {
  return (
    <div>

      <Hero />
      <Aboutus />
      <Serviceweoffer />
      <Packageoverview />
      <Customizedpackage />
      <Contactus />
      <FAQ />

    </div>
  )
}

export default Landingpage