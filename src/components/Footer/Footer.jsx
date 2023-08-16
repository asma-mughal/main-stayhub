import React from 'react'
import NewsLetter from './NewsLetter'

const Footer = ({news}) => {
  return (
    <div>
    <NewsLetter news={news} />  
    </div>
  )
}

export default Footer
