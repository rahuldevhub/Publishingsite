import React from 'react'
import allemployeename from '../../Assets/data/employeedata'
import { Link } from 'react-router-dom';

const Allemployee = () => {
  return (
    <div className='Allemployee'> 
    

    {allemployeename.map((data)=>(
            <Link to={`/employee/${data.name}`}>

        <h1>{data.name}</h1></Link>
    ))}

  
    </div>
  )
}

export default Allemployee