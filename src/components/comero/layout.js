import React from "react"
import '../../styles/comero/reset.scss'
import '../../styles/comero/comero.scss'

import { useMediaQuery } from "../../hooks/useMediaQuery"

import ReturnToTop from "./returnToTop"

const Layout = ({ children }) => {
    let header, footer

    header = useMediaQuery("(min-width: 950px)") ? <Navbar /> : <nav id="home" className="navbar"><h1 className="logo">Comero</h1></nav>
    footer = (
        <>
            <ReturnToTop />
            <hr />
            {/* <span className="attribution">The Comero software platform is developed and maintained by Shewperman Web & Software Development. To find out more, <a href="https://shewperman.dev" target="_blank" rel="noopener noreferrer">visit the Shewperman website.</a></span> */}
        </>
    )

    return (
        <div className="comero">
            <header className="header">{header}</header>
            <main className="main">{children}</main>
            <footer className="footer">{footer}</footer>
        </div>
    )
}

export default Layout

const Navbar = ({ ...props }) => (
    <nav id="home" className="navbar">
        <h1 className="logo">Comero</h1>
        <div className="right-container">
            <a href="#demo">Demo</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#get-started">Get Started</a>
        </div>
    </nav>
)