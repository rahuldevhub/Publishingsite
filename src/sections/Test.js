import React from 'react'
import '../css/test.css'
import logoimg from '../assets/logo.jpeg'

const Test = () => {
  return (
    <div class="distribution">
      <h1>Our Distribution Channels</h1>
      <p>Join Join us on a worldwide literary journey, Where we take your stories to readers in over 150 Countries</p>
      <div class="logo">

        {/* <img src="new.svg"> */}
        <img src={logoimg}></img>
      </div>
    </div>
  )
}

export default Test