import React from 'react';
import '../css/notfound.css'
const Notfound = () => {
  return (
    <div className='Notfound'>

        <div >
            <h1 className='Notfound-title'>Oops! Page Not Found</h1>
            <p className='Notfound-subtitle'>We couldn’t find the page you were looking for</p>
            <p className='Notfound-subtitle'>It may have been moved or deleted</p>
            <a href='https://www.riterapublishing.com/'> Return to home</a>
        </div>
    </div>
  )
}

export default Notfound