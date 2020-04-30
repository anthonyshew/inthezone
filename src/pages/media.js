import React from "react"
import '../styles/media.scss'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ location }) => {
    const data = useStaticQuery(graphql`
        query MediaPageQuery {
            elUniversal: file(absolutePath: { regex: "/media/el-universal.png/" }) {
                childImageSharp {
                  fixed(width: 175) {
                    ...GatsbyImageSharpFixed
                  }
                }
            }
            royalsReview: file(absolutePath: { regex: "/media/royals-review.png/" }) {
                childImageSharp {
                  fixed(width: 200) {
                    ...GatsbyImageSharpFixed
                  }
                }
            }
            twinkieTown: file(absolutePath: { regex: "/media/twinkie-town.png/" }) {
                childImageSharp {
                  fixed(width: 200) {
                    ...GatsbyImageSharpFixed
                  }
                }
            }
            siCom: file(absolutePath: { regex: "/media/si.jpg/" }) {
                childImageSharp {
                  fixed(width: 175, height: 175) {
                    ...GatsbyImageSharpFixed
                  }
                }
            }
            twelveNews: file(absolutePath: { regex: "/media/12news.jpg/" }) {
                childImageSharp {
                  fixed(width: 175, height: 175) {
                    ...GatsbyImageSharpFixed
                  }
                }
            }
            letsGetTwo: file(absolutePath: { regex: "/media/lets-get-two.jpg/" }) {
                childImageSharp {
                  fixed(width: 175, height: 175) {
                    ...GatsbyImageSharpFixed
                  }
                }
            }
            wbtw: file(absolutePath: { regex: "/media/wbtw.jpg/" }) {
                childImageSharp {
                  fixed(width: 175) {
                    ...GatsbyImageSharpFixed
                  }
                }
            }
        }
    `)

    const stories = [
        {
            publication: "SI.com",
            title: "'Adopt a Minor Leaguer' Program Gives Players a Lifeline as MLB Shuts Down",
            author: "Emma Baccellieri",
            date: "12 March 2020",
            mediaType: "article",
            image: data.siCom.childImageSharp.fixed,
            imageAlt: "'Adopt a Minor Leaguer' Program Gives Players a Lifeline as MLB Shuts Down",
            link: "https://www.si.com/mlb/2020/03/17/adopt-a-minor-leaguer-program",
        },
        {
            publication: "El Universal",
            title: "Aficionados Ayudan Económicamente a Peloteros de Ligas Menores",
            author: "Alain Arenas",
            date: "3 April 2020",
            mediaType: "article",
            image: data.elUniversal.childImageSharp.fixed,
            imageAlt: "Aficionados Ayudan Económicamente a Peloteros de Ligas Menores",
            link: "https://www.eluniversal.com.mx/universal-deportes/beisbol/covid-19-aficionados-ayudan-economicamente-peloteros-de-ligas-menores",
        },
        {
            publication: "Arizona 12News",
            title: "‘Adopt a Minor Leaguer’ organization helps players in need",
            author: "Minda Haas Kuhlmann",
            date: "12 March 2020",
            mediaType: "video",
            image: data.twelveNews.childImageSharp.fixed,
            imageAlt: "‘Adopt a Minor Leaguer’ organization helps players in need",
            link: "https://www.12news.com/article/sports/adopt-a-minor-leaguer-organization-helps-players-in-need/75-686386b3-2a8a-4447-b4b7-41e77f477eda",
        },
        {
            publication: "Let's Get Two Podcast",
            title: "Rubber Ducks, Redbirds, and Sea Dogs (Chapter Marker 4) ",
            author: "James Christopher",
            date: "24 March 2020",
            mediaType: "audio",
            image: data.letsGetTwo.childImageSharp.fixed,
            imageAlt: "Rubber Ducks, Redbirds, and Sea Dogs (Chapter Marker 4)",
            link: "https://letsgettwo.buzzsprout.com/247208/3112912-let-s-get-two-s2-e12-rubber-ducks-redbirds-and-sea-dogs",
        },
        {
            publication: "WBTW",
            title: "‘Adopt A Minor Leaguer’ makes an impact on Myrtle Beach Pelicans",
            author: "Candace Martino",
            date: "3 April 2020",
            mediaType: "video",
            image: data.wbtw.childImageSharp.fixed,
            imageAlt: "‘Adopt A Minor Leaguer’ makes an impact on Myrtle Beach Pelicans",
            link: "https://twitter.com/CandaceMartino/status/1246503976557776896",
        },
        {
            publication: "Royals Review",
            title: "Adopt a MiLB player? Now you can.",
            author: "Minda Haas Kuhlmann",
            date: "12 March 2020",
            mediaType: "article",
            image: data.royalsReview.childImageSharp.fixed,
            imageAlt: "Adopt a MiLB player? Now you can.",
            link: "https://www.royalsreview.com/platform/amp/2020/3/12/21175748/adopt-a-milb-player-now-you-can?utm_campaign=royalsreview&utm_content=chorus&utm_medium=social&utm_source=twitter&__twitter_immediaion=true&fbclid=IwAR1OfshBPSu2qUPzOJxA-Vg2XVmTqfcF_gsjvG-kPF0BGiOhNYUTD5E6hiI",
        },
        {
            publication: "Twinkie Town",
            title: "Baseball shutting down is screwing over minor leaguers—here is how you can help",
            author: "TJ Gorsegner",
            date: "12 March 2020",
            mediaType: "article",
            image: data.twinkieTown.childImageSharp.fixed,
            imageAlt: "Baseball shutting down is screwing over minor leaguers—here is how you can help",
            link: "https://www.twinkietown.com/platform/amp/2020/3/12/21177534/mlb-minnesota-twins-baseball-shutting-down-coronavirus-delayed-season-is-screwing-over-minor-leagues?utm_campaign=twinkietown&utm_content=chorus&utm_medium=social&utm_source=twitter&__twitter_immediaion=true&fbclid=IwAR0NTls4TN3SwlsSf4ILXZvTLRYebnszhWxgc8griCoC8fE0XNyeqr757k4",
        }
    ]

    return (
        <Layout location={location}>
            <SEO title="In the Media">
                <meta name="og:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image:alt" content="Adopt a Minor Leaguer In the Media Page" />
            </SEO>
            <div className="page-media">
                <h1>In the Media</h1>
                <MediaNotice />
                {stories.map((story, index) => (
                    <Story
                        key={story.link}
                        publication={story.publication}
                        title={story.title}
                        date={story.date}
                        author={story.author}
                        mediaType={story.mediaType}
                        image={story.image}
                        imageAlt={story.imageAlt}
                        link={story.link}
                    />
                ))}
                <MediaNotice />
            </div>
        </Layout>
    )
}

const MediaNotice = () => (
    <p className="media-notice">Are you a member of the media looking to have a word with us?<br /><Link to="/contact-us" className="underline">Click here to send us a message.</Link></p>
)

const Story = ({ publication,
    title,
    date,
    author,
    mediaType,
    image,
    imageAlt,
    link }) => (
        <section className="story">
            <h2>{publication}</h2>
            <div className="flex-row">
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <Image
                        className="image"
                        fixed={image}
                        alt={imageAlt}
                    />
                </a>
                <div className="description">
                    <h3>{title}</h3>
                    <h4>{author}</h4>
                    <p>{date}</p>
                    <div className="container-link-button">
                        <a className="link-button" href={link} target="_blank" rel="noopener noreferrer">
                            {mediaType === "video" ? "Watch" : mediaType === "audio" ? "Listen" : "Read"}
                        </a>
                    </div>
                </div>
            </div>

        </section>
    )