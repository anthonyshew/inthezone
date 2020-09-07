import React from "react"
import PropTypes from "prop-types"
import Image from "gatsby-image"

export const ImageMatcher = ({
    className,
    style,
    imageSharps,
    originalName,
    alt
}) => {
    const matchOriginalImageName = (imageSharpsArray, originalName) => {
        return imageSharpsArray.find(({ node }) => node.childImageSharp.fluid.originalName === originalName).node.childImageSharp.fluid
    }

    return <Image
        className={className}
        fluid={matchOriginalImageName(imageSharps, originalName)}
        alt={alt}
    />
}

ImageMatcher.propTypes = {
    className: PropTypes.string.isRequired,
    style: PropTypes.object,
    imageSharps: PropTypes.array.isRequired,
    originalName: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}