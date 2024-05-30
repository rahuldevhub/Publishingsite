import React from 'react'
import Header from '../components/header/Header'

import Contactusform from '../components/contactusform/Contactusform'
import Footer from '../components/footer/Footer'



const Contactpage = () => {
    return (
        <div>
            <Header />
            <div className='allservice-title-top'>
                <p className='allservice-title' >Contact Us</p>
            </div>

            <Contactusform />
            
            <Footer/>



        </div>
    )
}

export default Contactpage