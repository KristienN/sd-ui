import React from 'react'
import NavbarItem from './NavbarItem'
import { Bars3Icon } from '@heroicons/react/24/solid'

const Navbar = () => {
  return (
    <nav className='relative px-6 mx-auto p-4 border-b-2 w-full'>
        <div className='container mx-auto flex items-center justify-between'>
            <div className='pt-2'>
                <a className='text-3xl italic text-left'>Sentence Diagram</a>
            </div>
            <div className='hidden md:flex space-x-4 items center pt-2'>
                <NavbarItem name='Learn'/>
                <NavbarItem name='Quiz'/>
                <NavbarItem name='Community'/> 
                <NavbarItem name='Contact'/>
            </div>
            <Bars3Icon className='h-8 w-8 hover:text-gray-400 hover:cursor-pointer md:hidden'/>
        </div>
    </nav>
  )
}


export default Navbar