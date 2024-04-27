import React, { useState } from 'react'
import '../css/packageoverview.css'
import Package1 from '../components/pricepackage/Package1'
import Package2 from '../components/pricepackage/Package2'

const Packageoverview = () => {
    const [reqtype, setreqtype] = useState('Level1')
    const [active, setactive] = useState("Level1")

    let handelchange = (para) => {
        setreqtype(para)
        setactive(para)
    }

 return (
        <div className='Packageoverview'>
            <p className='title' >Choose your Package</p>
            <p className='package-subtitle' >Take a look on our range of six perfectly tailored packages, designed to meet your needs and exceed your expections, all at a price that ensure satisfaction without compromise.</p>
            


            <form className='package-form' onSubmit={(e) => e.preventDefault()}>
                
    
                <button id='1' className={"Level1" === reqtype ? "selected" : null} type='button' onClick={() => (handelchange("Level1"))}>Level 1</button>
                <button id='1' className={"Level2" === reqtype ? "selected" : null} type='button' onClick={() => (handelchange("Level2"))}>Level 2</button>
                <hr class="solid " />
            </form>

            {active === "Level1" && <Package1 />}
            {active === "Level2" && <Package2 />}

        </div>
    )
}
        

   

        
    
export default Packageoverview