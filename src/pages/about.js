import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import '../styles/about.scss'

import Layout from "../components/layout"
import Markdown from "../components/markdown"

export default ({ location }) => {
  const { colors, aboutMarkdown } = useStaticQuery(graphql`
    {
      ...Colors
      aboutMarkdown: file(sourceInstanceName: {eq: "about"}) {
        childMarkdownRemark {
          html
        }
      }
    }
    `)

  return (
    <Layout location={location} title="About Us">
      <h1 className="about-header" style={{ color: colors.childContentJson.secondaryColor }}>About</h1>
      <Markdown markdown={aboutMarkdown.childMarkdownRemark.html} />
    </Layout>
  )
}