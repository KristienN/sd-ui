import React from 'react'

type navInfo = {
    name: string
}
    
const NavbarItem = ({name}:navInfo) => {
  return (
       <a className='hover:text-gray-400 block px-5 hover:cursor-pointer' >{name}</a>
  )
}

export default NavbarItem