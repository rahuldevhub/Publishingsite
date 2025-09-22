import React from 'react'
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
const Breadcrumbs = ({ crumbs }) => {
  return (
    <div className='Breadcrumbs'>

<nav aria-label="breadcrumb">
      <ol style={{ display: "flex", listStyle: "none", padding: 0 }}>
        {crumbs.map((crumb, index) => (
          <li key={index} style={{ display: "flex", alignItems: "center" }}>
            {index > 0 && <span style={{ margin: "0 9px" }}><IoIosArrowForward /></span>}
            {crumb.path ? (
              <Link to={crumb.path} style={{ textDecoration: "none", color: "black" }}>
                {crumb.label}
              </Link>
            ) : (
              <span style={{ color: "gray" }}>{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
    </div>
  )
}

export default Breadcrumbs