import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "../styles/templates/blog-list.scss"

import Layout from "../components/layout"

export default ({ location }) => {
    const { colors } = useStaticQuery(graphql`
    {
        ...Colors
    }
    `)

    return (
        <Layout location={location} title={`Blog`}>
            <h1 className="title" style={{ color: colors.childContentJson.secondaryColor }}>Blog</h1>
            <p className="empty-list-p">Oops, doesn't look like we have any blog posts yet!</p>
            <p className="empty-list-p"> Stay tuned for a post from us!</p>
        </Layout>
    )
}
