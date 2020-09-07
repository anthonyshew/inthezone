import React from 'react'
import { Link } from "gatsby"
import '../styles/404.scss'

import Layout from "../components/layout"

export default ({ location }) => {
    return (
        <Layout location={location} title="Shop">
            <p>Coming soon!</p>
            <Link to="/">Back to Home</Link>
        </Layout>
    )
}