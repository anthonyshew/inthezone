let { createProxyMiddleware } = require("http-proxy-middleware")

require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `In the Zone Development`,
    description: `Two baseball players that are also professional web developers.`
  },
  developMiddleware: app => {
    app.use(
      "/.netlify/functions",
      createProxyMiddleware({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions": "",
        },
      })
    )
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/comero/assets`,
        name: `comeroAssets`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `In The Zone Development`,
        short_name: "In the Zone",
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `static/images/agency-logo.png`,
      },
    },
  ],
}
