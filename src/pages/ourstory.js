import React from "react"
import { Link, graphql } from "gatsby"
import '../styles/index.scss'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Carousel from '../components/carousel'
import Image from "gatsby-image"

export default ({ data, location }) => {
    return (
        <Layout location={location}>
            <div className="our-story">
                This is where our story goes.
            </div>
        </Layout>
    )
}