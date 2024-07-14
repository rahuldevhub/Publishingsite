import React, { useEffect } from 'react'
import Header from '../components/header/Header'
import Contactusform from '../components/contactusform/Contactusform'
import Footer from '../components/footer/Footer'



const Contactpage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>

            <div className='allservice-title-top'>
                <p className='allservice-overall-title' >Contact Us</p>
            </div>

            <Contactusform />

        </div>
    )
}

export default Contactpage