import React from 'react'
import Contactusform from '../components/contactusform/Contactusform'
import '../css/contactus.css'
const Contactus = () => {
    return (
        <div className='Contactus'>

            <p className='title' >What can us do for you?</p>
            <p className='subtitle' >We are ready to work on a project of any complexity, whether it’s commercial or residential.</p>

            <Contactusform/>


        </div>
    )
}

export default Contactus