import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link, navigate } from "@reach/router"
import "../../styles/docs/teamstage.scss"

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

    const [activeArticle, setActiveArticle] = useState(emptyArticleObject)
    const [activeCategory, setActiveCategory] = useState("")

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

    return (
        <main className="docs-container" style={{
            position: "fixed",
            height: "100%",
            width: "100vw",
        }}>
            <SEO title="TeamStage User's Manual (Multi-Team)" htmlAttributes={{ class: "no-scroll" }} />
            <nav className="left-nav">
                <h1>TeamStage User's Manual (Multi-Team Edition)</h1>
                {data.tsMultiJson.categories.map(cat => (
                    <section key={cat.title} className={`category-section${activeCategory === cat.title ? " active" : ""}`}>
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
                    <header>
                        <h2>
                            {activeArticle.node.childMarkdownRemark.frontmatter.title}
                        </h2>
                    </header>
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
                Welcome!
        </h2>
        </header>
        <main>
            Look to the left.
        </main>
    </article>
)