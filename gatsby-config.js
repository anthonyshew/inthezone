let { createProxyMiddleware } = require("http-proxy-middleware")

require('dotenv').config()

module.exports = {
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
  ],
}
