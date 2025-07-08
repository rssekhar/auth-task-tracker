import React from 'react'

const Footer = () => {
    return (
        <div className='bg-dark text-light p-3'>
            <p className='text-center'>&copy; All Rights Rserved - {new Date().getFullYear()}</p>
        </div>
    )
}

export default Footer
