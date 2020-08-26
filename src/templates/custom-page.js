import React from 'react'
import { graphql } from "gatsby"
import Image from "gatsby-image"
import "../styles/templates/custom-page.scss"

import Layout from "../components/layout"

export default ({ location, pageContext, data }) => {

  const { imageSharp, markdownRemark, colors } = data

  const { primaryColor, secondaryColor } = colors.childContentJson

  return (
    <Layout location={location} title={markdownRemark.frontmatter.title}>
      <div className="page-custom">
        <section className="hero" style={{ borderBottom: `5px solid ${primaryColor}` }}>
          <Image className="image" fluid={imageSharp.fluid} />
          <div className="text-container">
            <h1 className="title" style={{ color: primaryColor }}>{markdownRemark.frontmatter.title}</h1>
            <p className="short-description" style={{ color: secondaryColor }}>{markdownRemark.frontmatter.shortDescription}</p>
          </div>
        </section>

        <section className="markdown-body" dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      </div>
    </Layout>
  )
}

export const custmPageQuery = graphql`
query CustomPageBySlug($slug: String!, $image: String!) {
    colors: file(sourceInstanceName: {eq: "colors"}) {
        childContentJson {
          secondaryColor
          primaryColor
          textColor
        }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        shortDescription
        coverImage
      }
    }
    imageSharp(fluid: {originalName: {eq: $image}}) {
      fluid {
          ...GatsbyImageSharpFluid
      }
    }
}
`