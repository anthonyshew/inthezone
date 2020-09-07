import React from "react"
import { graphql } from "gatsby"
import "../styles/templates/team-page.scss"

import Layout from "../components/layout"
import Player from "../components/svg/player"
import { Accordion, AccordionItem } from "../components/accordion"
import { ImageMatcher } from "../components/imageMatcher"

export default ({ data, pageContext, location }) => {

    const { teamData, colors, teamImages } = data
    const { ageGroup, bio, coaches, players, schedule, statsBool } = teamData.childTeamsJson
    const { primaryColor, secondaryColor } = colors.childContentJson

    return (
        <Layout location={location} title={`Team: ${ageGroup}`}>
            <h1 className="heading" style={{ color: secondaryColor }}>{ageGroup}</h1>
            <Accordion>
                <AccordionItem header="Schedule">
                    <div className="games-container">
                        <h3 style={{ color: secondaryColor }}>Upcoming Games</h3>
                        {schedule.games.map(game => (
                            <div key={game.startTime + game.side + game.opponent} className="game">
                                <p>{game.side === "Home" ? ".vs" : "@"} {game.opponent}</p>
                                <p>{game.startTime}</p>
                            </div>
                        ))}
                    </div>
                    <div className="practices-container">
                        <h3 style={{ color: secondaryColor }}>Practice Schedule</h3>
                        {schedule.practices.map(practice => (
                            <div key={practice.day + practice.startTime + practice.endTime} className="practice">
                                <p className="day-and-time">{practice.day}, {practice.startTime}-{practice.endTime}</p>
                                <p className="location">{practice.addressObject.location}</p>
                                <p className="address-line-1">{practice.addressObject.streetAddress}</p>
                                <p className="address-line-2">{practice.addressObject.city}, {practice.addressObject.state} {practice.addressObject.zipCode}</p>
                            </div>
                        ))}
                    </div>
                </AccordionItem>
                <AccordionItem header="Coaches">
                    <div className="coaches-container">
                        {coaches.map(coach => (
                            <div key={coach} className="coach">
                                <ImageMatcher
                                    className="coach-image"
                                    imageSharps={teamImages.edges}
                                    originalName={coach.image}
                                    alt={coach.name}
                                />
                                <div className="coach-text-container">
                                    <p className="coach-name" style={{ color: primaryColor }}>{coach.name}</p>
                                    <p className="coach-title" style={{ color: secondaryColor }}>{coach.title}</p>
                                </div>
                                <p className="coach-bio">{coach.bio}</p>
                            </div>
                        ))}
                    </div>
                </AccordionItem>
                <AccordionItem header="Players">
                    <div className="players-container">
                        {players.map(player => (
                            <div key={player.name} className="player">
                                <div className="image-column">
                                    {player.imgBool ? <ImageMatcher
                                        className="player-image"
                                        imageSharps={teamImages.edges}
                                        originalName={player.image}
                                        alt={player.name} />
                                        : <Player className="player-placeholder" secondaryColor={secondaryColor} />}
                                </div>
                                <div className="content-container">
                                    <h2 className="player-name" style={{ color: primaryColor }}>{player.name}</h2>
                                    <p className="positions">{player.positions.map((position, index) => {
                                        if (index === player.positions.length - 1) {
                                            return `${position}`
                                        } else {
                                            return `${position}, `
                                        }
                                    })}</p>

                                    {statsBool && <Stats player={player} />}

                                </div>
                            </div>
                        ))}
                    </div>
                </AccordionItem>
                <AccordionItem header="Team Bio">
                    <p className="team-bio" dangerouslySetInnerHTML={{ __html: bio }} />
                </AccordionItem>
            </Accordion>
        </Layout>
    )
}

const Stats = ({ player }) => (
    <>
        <h3>2020 Hitting</h3>
        <div className="stats-table-container">
            <table className="stats-table hitting">
                <thead>
                    <tr>
                        <th>G</th>
                        <th>AB</th>
                        <th>H</th>
                        <th>HR</th>
                        <th>3B</th>
                        <th>2B</th>
                        <th>BB</th>
                        <th>K</th>
                        <th>RBI</th>
                        <th>AVG</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{player.hittingStats.games}</td>
                        <td>{player.hittingStats.atBats}</td>
                        <td>{player.hittingStats.hits}</td>
                        <td>{player.hittingStats.homeRuns}</td>
                        <td>{player.hittingStats.triples}</td>
                        <td>{player.hittingStats.doubles}</td>
                        <td>{player.hittingStats.walks}</td>
                        <td>{player.hittingStats.strikeouts}</td>
                        <td>{player.hittingStats.rbi}</td>
                        <td>{player.hittingStats.battingAverage.toFixed(3)}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3>2020 Pitching</h3>
        <div className="stats-table-container">
            <table className="stats-table hitting">
                <thead>
                    <tr>
                        <th>W</th>
                        <th>L</th>
                        <th>ERA</th>
                        <th>IP</th>
                        <th>H</th>
                        <th>R</th>
                        <th>ER</th>
                        <th>BB</th>
                        <th>K</th>
                        <th>AVGA</th>
                        <th>WHIP</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{player.pitchingStats.wins}</td>
                        <td>{player.pitchingStats.losses}</td>
                        <td>{player.pitchingStats.era.toFixed(2)}</td>
                        <td>{player.pitchingStats.inningsPitched.toFixed(1)}</td>
                        <td>{player.pitchingStats.hits}</td>
                        <td>{player.pitchingStats.runs}</td>
                        <td>{player.pitchingStats.earnedRuns}</td>
                        <td>{player.pitchingStats.walks}</td>
                        <td>{player.pitchingStats.strikeouts}</td>
                        <td>{player.pitchingStats.battingAverageAgainst.toFixed(3)}</td>
                        <td>{player.pitchingStats.whip.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
)

export const pageQuery = graphql`
query TeamPageQuery($name: String!) {
    teamData: file(sourceInstanceName: {eq: "teams"}, name: {eq: $name}) {
        childTeamsJson {
            ageGroup
            bio
            statsBool
            coaches {
              name
              title
              image
              bio
            }
            players {
              hittingStats {
                hits
                games
                doubles
                homeRuns
                walks
                atBats
                triples
                strikeouts
                rbi
                battingAverage
              }
              pitchingStats {
                hits
                inningsPitched
                battingAverageAgainst
                runs
                walks
                losses
                era
                wins
                strikeouts
                whip
                earnedRuns
              }
              image
              imgBool
              name
              positions
            }
            schedule {
                games {
                  startTime
                  side
                  opponent
                }
                practices {
                  day
                  startTime
                  endTime
                  addressObject {
                    location
                    streetAddress
                    city
                    state
                    zipCode
                  }
                }
            }
          }
    }
    ...TeamImages
    ...Colors
}
`