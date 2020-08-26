import React from 'react'
import { Link } from "gatsby"
import '../styles/404.scss'

import Layout from "../components/layout"

export default ({ location }) => {
    return (
        <Layout location={location} title="404: Not Found">
            <p>Oops, it doesn't look like there is anything here!</p>
            <Link to="/">Back to Home</Link>
        </Layout>
    )
}