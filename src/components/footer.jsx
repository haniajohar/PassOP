import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col justify-center items-center w-full px-4 bg-slate-800 text-white'>
            <div className="font-bold py-1 text-white text-2xl">
                <span className="text-green-700">&lt;</span>
                Pass
                <span className="text-green-700">OP/&gt;</span>
            </div>
            <div>
                <h4 className='text-sm'>Made with ❤️ by Hania Johar</h4>
            </div>
        </div>
    )
}

export default Footer
