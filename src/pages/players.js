import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import '../styles/players.scss'

import Layout from "../components/layout"
import Player from "../components/svg/player"

export default ({ location }) => {
  const { data, colors } = useStaticQuery(graphql`
  query PlayersQuery {
    data: file(sourceInstanceName: {eq: "players"}) {
      childContentJson {
        statsBool
        playersArray {
          name
          positions
          imgBool
          image
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
        }
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

  const playersArray = data.childContentJson.playersArray
  const { primaryColor, secondaryColor } = colors.childContentJson
  console.log(playersArray[0])

  return (
    <Layout location={location} cssPageName="players">
      <h1 style={{ color: secondaryColor }}>Roster</h1>
      {playersArray.map(player => (
        <div key={player.name} className="player">
          <div className="image-column">
            {player.imgBool ? <img className="player-image" src={player.image} alt={player.name} /> : <Player className="player-placeholder" secondaryColor={secondaryColor} />}
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

            {data.childContentJson.statsBool && <Stats player={player} />}

          </div>
          <hr />
        </div>
      ))}

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