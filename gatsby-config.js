let { createProxyMiddleware } = require("http-proxy-middleware")
const fs = require("fs")

require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `TeamStage`,
    author: {
      name: `Anthony Shew`,
      summary: `who develops things.`,
    },
    description: `TeamStage`,
    social: {
      twitter: `/theunrealashew`,
    }
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
    `gatsby-plugin-netlify-cms`,
    `gatsby-background-image`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets/placeholder.png`,
        name: `placeholder`
      }
    },
    fs.existsSync(`${__dirname}/content/assets/blogImages`) ? {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets/blogImages`,
        name: `blogImgs`,
      },
    } : "",
    fs.existsSync(`${__dirname}/content/assets/customPages`) ? {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets/customPages`,
        name: `customPageImgs`,
      },
    } : "",
    fs.existsSync(`${__dirname}/content/assets/gallery`) ? {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets/gallery`,
        name: `galleryImgs`
      }
    } : "",
    fs.existsSync(`${__dirname}/content/assets/homePage`) ? {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets/homePage`,
        name: `homePageImgs`
      }
    } : "",
    fs.existsSync(`${__dirname}/content/assets/logo`) ? {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets/logo`,
        name: `orgLogos`
      }
    } : "",
    fs.existsSync(`${__dirname}/content/assets/teams`) ? {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets/teams`,
        name: `teamsImgs`
      }
    } : "",
    fs.existsSync(`${__dirname}/content/blog`) ? {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    } : "",
    fs.existsSync(`${__dirname}/content/customPages`) ? {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/customPages`,
        name: `customPages`,
      },
    } : "",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/basics.json`,
        name: `basics`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/colors.json`,
        name: `colors`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/homePage.json`,
        name: `homePage`,
      },
    },
    fs.existsSync(`${__dirname}/content/gallery`) ? {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/gallery`,
        name: `gallery`,
      },
    } : "",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/siteOptions/contact.json`,
        name: `contact`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/siteOptions/social.json`,
        name: `socials`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/about.md`,
        name: `about`,
      },
    },
    fs.existsSync(`${__dirname}/content/teams`) ? {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/teams`,
        name: `teams`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/cms/cms.js`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`
          },
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
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
