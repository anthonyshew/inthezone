import React from "react"
import { Link, graphql } from "gatsby"
import '../styles/index.scss'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Carousel from '../components/carousel'
import Image from "gatsby-image"

import useMediaQuery from '../hooks/useMediaQuery'

export default ({ data, location }) => {
    return (
        <Layout>
            <div className="our-story">
                This is where our story goes.
            </div>
        </Layout>
    )
}