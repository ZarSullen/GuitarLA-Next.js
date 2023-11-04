import React from 'react'
import NavBar from './navBar'
import Footer from './footer'

const Layout = ({children}) => {
  return (
    <>  
        <NavBar />
            {children}
        <Footer />
    </>
  )
}

export default Layout