import React from "react"
import "../styles/components/markdown.scss"

export default ({ markdown }) => (
    <article className="markdown" dangerouslySetInnerHTML={{ __html: markdown }} />
)