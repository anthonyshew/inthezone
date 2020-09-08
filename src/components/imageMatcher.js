import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

export const ImageMatcher = ({
    className,
    style,
    imageSharps,
    originalName,
    alt
}) => {
    const { placeholder } = useStaticQuery(graphql`
    {
        placeholder: file(sourceInstanceName: {eq: "placeholder"}) {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
    }
    `)

    const matchOriginalImageName = (imageSharpsArray, originalName) => {
        if (imageSharpsArray.length === 0) {
            return placeholder.childImageSharp.fluid
        }

        const imageMatch = imageSharpsArray.find(({ node }) => node.childImageSharp.fluid.originalName === originalName)

        if (imageMatch) {
            return imageMatch.node.childImageSharp.fluid
        } else {
            return placeholder.childImageSharp.fluid
        }
    }

    return <Image
        className={className}
        fluid={matchOriginalImageName(imageSharps, originalName)}
        alt={alt}
        style={style}
    />
}

ImageMatcher.propTypes = {
    className: PropTypes.string.isRequired,
    style: PropTypes.object,
    imageSharps: PropTypes.array.isRequired,
    originalName: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}