import React, { useRef } from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
import FocusLock from "react-focus-lock"
import "../styles/components/mobile-menu.scss"

import useBodyScrollLock from "../hooks/useBodyScrollLock"

export default ({ setIsMenuOpen, primaryColor, secondaryColor, textColor }) => {
    const { pages } = useStaticQuery(graphql`
    query MobileMenuQuery {
        pages: allFile(filter: {sourceInstanceName: {eq: "customPages"}}) {
            edges {
              node {
                childMarkdownRemark {
                  fields {
                    slug
                  }
                  frontmatter {
                      title
                  }
                }
              }
            }
          }
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
                        <Link className="link" to="/schedule" >Schedule</Link>
                        <Link className="link" to="/coaches" >Coaches</Link>
                        <Link className="link" to="/players" >Players</Link>
                        {pages.edges.map(({ node }) => <Link key={node.childMarkdownRemark.fields.slug} className="link" to={`/page${node.childMarkdownRemark.fields.slug}`}>{node.childMarkdownRemark.frontmatter.title}</Link>)}
                        <Link className="link" to="/contact" >Contact Us</Link>
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