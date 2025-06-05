import React from 'react'

const Card = ({children, bg = 'bg-cream', p = 'p-6', order =''}) => {
  return (
    <div className={`${bg} ${p} ${order} rounded-lg shadow-md`}>{children}</div>
    );
}

export default Card