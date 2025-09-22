import React, { useState } from 'react'
import './package.css'
import Basicpackage from './Basicpackage'
import Toppackage from './Toppackage'

const Package = () => {
    const [reqtype, setreqtype] = useState('Level1')
    const [active, setactive] = useState("Level1")

    let handelchange = (para) => {
        setreqtype(para)
        setactive(para)
    }
    return (
        <div className='Package'>

            <form className='package-form' onSubmit={(e) => e.preventDefault()}>

                <button id='1' className={"Level1" === reqtype ? "selected" : null} type='button' onClick={() => (handelchange("Level1"))}  >Basic</button>
                <button id='1' className={"Level2" === reqtype ? "selected" : null} type='button' onClick={() => (handelchange("Level2"))}  >Top-Tier </button>

            </form>

            {active === "Level1" && <Basicpackage />}
            {active === "Level2" && <Toppackage />}

        </div>
    )
}

export default Package