import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import '../styles/index.scss'

import Layout from "../components/layout"
import WedgeHighLow from "../components/svg/wedgeHighLow"
import WedgeLowHigh from "../components/svg/wedgeLowHigh"
import Schedule from "../components/svg/schedule"
import Coach from "../components/svg/coach"
import Player from "../components/svg/player"

export default ({ location }) => {
    const { data, colors } = useStaticQuery(graphql`
    {
        data: file(sourceInstanceName: {eq: "homePage"}) {
            childContentJson {
                heroImage
                heroText
                scheduleIcon {
                    imageBool
                    image
                }
                coachesIcon {
                    imageBool
                    image
                }
                playersIcon {
                    imageBool
                    image
                }
                quotation
                quoteAttr
                teamLogo
                teamName
                auxText
            }
          }
        colors: file(sourceInstanceName: {eq: "colors"}) {
            childContentJson {
              secondaryColor
              primaryColor
              textColor
            }
          }
    }
    `)

    const homePageJson = data.childContentJson
    const primaryColor = colors.childContentJson.primaryColor
    const secondaryColor = colors.childContentJson.secondaryColor
    const textColor = colors.childContentJson.textColor
    const linkStyles = { backgroundColor: primaryColor, color: textColor }

    return (
        <Layout location={location} cssPageName="home">
            <section className="hero" style={{ backgroundImage: `url(${homePageJson.heroImage})` }}>
                {homePageJson.heroText && <h2 style={{ color: textColor }}>{homePageJson.heroText}</h2>}
            </section>

            <section className="panels">
                <WedgeHighLow className="background-svg" fill={secondaryColor} />
                <Link className="index-link-button schedule" to="/schedule" style={homePageJson.scheduleIcon.imageBool ? { justifyContent: "flex-end", backgroundImage: `url(${homePageJson.scheduleIcon.image})`, ...linkStyles } : { ...linkStyles }}>
                    {!homePageJson.scheduleIcon.imageBool && <Schedule primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} />}
                    {homePageJson.scheduleIcon.imageBool && <div className="gradient-mask"></div>}
                    <p className="link-text">Schedule</p>
                </Link>
                <Link className="index-link-button coaches" to="/coaches" style={homePageJson.coachesIcon.imageBool ? { justifyContent: "flex-end", backgroundImage: `url(${homePageJson.coachesIcon.image})`, ...linkStyles } : { ...linkStyles }}>
                    {!homePageJson.coachesIcon.imageBool && <Coach primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} />}
                    <p className="link-text">Coaches</p>
                </Link>
                <Link className="index-link-button players" to="/players" style={homePageJson.playersIcon.imageBool ? { justifyContent: "flex-end", backgroundImage: `url(${homePageJson.playersIcon.image})`, ...linkStyles } : { ...linkStyles }}>
                    {!homePageJson.playersIcon.imageBool && <Player primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} />}
                    <p className="link-text">Players</p>
                </Link>
            </section>

            <section className="team-proposition" style={{ backgroundColor: textColor, color: primaryColor }}>
                <p style={{ color: secondaryColor }}>{homePageJson.auxText}</p>
            </section>

            {homePageJson.quotation && <Testimonial homePageJson={homePageJson} primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} />}

        </Layout>
    )
}

const Testimonial = ({ homePageJson, primaryColor, secondaryColor, textColor }) => (
    <section className="testimonial-container" style={{ color: textColor }}>
        <WedgeLowHigh className="background-svg" fill={primaryColor} />
        <img className="avatar" src="/media/avatar.png" alt="Avatar." />
        <span className="quotation-mark open" style={{ color: secondaryColor }}>"</span>
        <p className="quotation" style={{ color: textColor }}>{homePageJson.quotation}</p>
        <span className="quotation-mark close" style={{ color: secondaryColor }}>"</span>
        <p className="attribution" style={{ color: textColor }}>- {homePageJson.quoteAttr}</p>
    </section>
)