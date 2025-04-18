import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="container mx-auto flex justify-between items-center px-4 py-5 h-14">
                <div className="logo font-bold text-white text-2xl">
                    <span className="text-green-700">&lt;</span>
                    Pass
                    <span className="text-green-700">OP/&gt;</span>
                </div>
              
                <button className='text-white bg-green-700 px-2 py-1 my-5 mx-3 rounded-full flex justify-between items-center ring-white ring-2'>
                    <FontAwesomeIcon icon={faGithub} />
                    <span className='font-bold px-2'>Github</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
