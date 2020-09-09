import React, { useRef } from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
import FocusLock from "react-focus-lock"
import "../styles/components/mobile-menu.scss"

import { useBodyScrollLock } from "../hooks/useBodyScrollLock"

export default ({ setIsMenuOpen, primaryColor, secondaryColor, textColor }) => {
    const { customPagesData, teams } = useStaticQuery(graphql`
    query MobileMenuQuery {
        ...AllCustomPageData
        ...AllTeamsData
    }
    `)

    useBodyScrollLock()

    const container = useRef(null)
    const menuBody = useRef(null)

    const handleMenuClose = () => {
        container.current.classList.add("out")
        menuBody.current.classList.add("out")

        setTimeout(() => {
            setIsMenuOpen(false)
        }, 500)
    }

    return (
        <FocusLock>
            <div className="mobile-menu-container" ref={container}>
                <div className="mobile-menu-body" style={{ backgroundColor: primaryColor }} ref={menuBody}>
                    <nav className="link-list">
                        <Link className="link" to="/" >Home</Link>
                        {customPagesData.edges.map(({ node }) => <Link key={node.childMarkdownRemark.fields.slug} className="link" to={`/page${node.childMarkdownRemark.fields.slug}`}>{node.childMarkdownRemark.frontmatter.title}</Link>)}
                        <Link className="link" to="/shop" >Shop</Link>
                        <Link className="link" to="/blog" >Blog</Link>
                        <Link className="link" to="/gallery" >Gallery</Link>
                        <Link className="link" to="/contact" >Contact Us</Link>
                        <h2 className="teams-header" style={{ color: secondaryColor }}>Teams</h2>
                        <div className="teams-links-container">
                            {teams.edges.map(({ node }) => (
                                <Link key={node.childTeamsJson.ageGroup} className="link" to={`/teams/${node.childTeamsJson.ageGroup}`} >{node.childTeamsJson.ageGroup}</Link>
                            ))}
                        </div>
                    </nav>
                    <button
                        className="close-button"
                        style={{ backgroundColor: secondaryColor, color: textColor }}
                        onClick={handleMenuClose}
                    >
                        Close Menu
                </button>
                </div>
            </div>
        </FocusLock>
    )
}