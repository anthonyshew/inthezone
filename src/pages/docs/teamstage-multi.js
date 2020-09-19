import React, { useState, useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link, navigate } from "@reach/router"
import "../../styles/docs/teamstage.scss"

import { useMediaQuery } from "../../hooks/useMediaQuery"
import SEO from "../../components/seo"

const emptyArticleObject = {
    node: {
        childMarkdownRemark: {
            fields: {
                slug: ""
            },
            html: "",
            frontmatter: {
                category: "",
                order: "",
                title: ""
            }
        }
    }
}

export default ({ location }) => {
    const data = useStaticQuery(graphql`
    {
        allFile(filter: {sourceInstanceName: {eq: "tsMultiArticles"}}, sort: {order: ASC, fields: childMarkdownRemark___frontmatter___order}) {
            edges {
              node {
                  childMarkdownRemark {
                      fields {
                          slug
                      }
                      html
                      frontmatter {
                        category
                        order
                        title
                      }
                  }
                }
            }
        }
        tsMultiJson {
            categories {
              title
            }
        }
    }
    `)

    const allArticles = data.allFile.edges

    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [activeArticle, setActiveArticle] = useState(emptyArticleObject)
    const [activeCategory, setActiveCategory] = useState("")

    const navMenu = useRef(null)
    const categorySection = useRef(null)

    useEffect(() => {

        const result = allArticles.find(({ node }) => node.childMarkdownRemark.fields.slug === location.pathname.split("/docs/teamstage-multi")[1])

        if (!result && location.pathname !== "/docs/teamstage-multi") {
            // TODO: Notify with a snackbar that that article was unavailable
            console.log("Unfortunately, that article doesn't appear to exist. Check through the rest of the manual or contact us at In the Zone if you still need help.")
            navigate("/docs/teamstage-multi")
        } else if (location.pathname === "/docs/teamstage-multi") {
            setActiveArticle(emptyArticleObject)
        } else {
            setActiveArticle(result)
        }
    }, [location, allArticles])

    const navToggle = () => {
        navMenu.current.classList.toggle("closed")
        setMenuIsOpen(!menuIsOpen)
    }

    return (
        <main className="docs-container" style={{
            position: "fixed",
            height: "100%",
            width: "100vw",
        }}>
            <SEO title="TeamStage User's Manual (Multi-Team)" htmlAttributes={{ class: "no-scroll" }} />
            <nav className="left-nav closed" ref={navMenu}>
                {useMediaQuery("(max-width: 1000px)") && <button
                    className="menu-toggle"
                    onClick={navToggle}
                >
                    {menuIsOpen ? "Close" : "Open"}
                </button>}
                <h1>TeamStage User's&nbsp;Manual</h1>
                <h2>(Multi-Team Edition)</h2>
                {data.tsMultiJson.categories.map(cat => (
                    <section
                        key={cat.title}
                        className={`category-section${activeCategory === cat.title ? " active" : ""}`}
                    >
                        <button
                            className={`category-title${activeCategory === cat.title ? " active" : ""}`}
                            onClick={() => setActiveCategory(cat.title)}
                        >
                            {cat.title}
                        </button>
                        <div className="article-list">
                            {allArticles
                                .filter(({ node }) => node.childMarkdownRemark.frontmatter.category === cat.title)
                                .map(({ node }) => (
                                    <Link
                                        key={node.childMarkdownRemark.fields.slug}
                                        className={`article-link${activeArticle.node.childMarkdownRemark.fields.slug === node.childMarkdownRemark.fields.slug ? " active" : ""}`}
                                        to={`/docs/teamstage-multi${node.childMarkdownRemark.fields.slug}`}
                                        style={activeCategory === cat.title ? {} : { padding: 0, maxHeight: 0 }}
                                        onClick={navToggle}
                                    >
                                        {node.childMarkdownRemark.frontmatter.title}
                                    </Link>
                                ))
                            }
                        </div>
                    </section>
                ))}
            </nav>


            {activeArticle.node.childMarkdownRemark.frontmatter.title === "" ? <Default /> :
                <article className="article">
                    <h2>
                        {activeArticle.node.childMarkdownRemark.frontmatter.title}
                    </h2>
                    <main dangerouslySetInnerHTML={{ __html: activeArticle.node.childMarkdownRemark.html }} />
                </article>
            }

        </main>
    )
}

const Default = () => (
    <article className="article">
        <header>
            <h2>
                Welcome to the website your team deserves.
        </h2>
        </header>
        <main>
            <p style={{ marginTop: "24px" }}>👈🏼 Use the menu to the left to find out how things work and what's possible. 👈🏼</p>
            <p>With a little bit of telling us who your organization is, we'll be able to give you the power to create a modern, beautiful website that your players, parents, coaches, and fans are going to love.</p>
            <h3>How It Works</h3>
            <p>We have done all the heavy lifting and employed a little bit of magic to take the load off of you. You've got enough to do; let us take care of the hard part of taking care of your team's website.</p>
            <h3>All we need from you is...</h3>
            <p>The stuff you want to be on the site! Images, text, and the information about your teams that make them great. Once we have that information, we can take care of the rest.</p>
            <h3>Have questions?</h3>
            <p>Hopefully, you can find the answers somewhere in this User's Manual. If not, please do not hesitate to <a href="https://inthezone.dev/#contact-form" target="_blank" rel="noopener noreferrer">contact us</a>. We're here to keep your site working - and you happy. 😀</p>
        </main>
    </article>
)