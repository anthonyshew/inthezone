import React from 'react'
import '../styles/player-card.scss'

export default ({ header, position, name, imagePath, children }) => {
    return (
        <div className="player-card">
            <h3>{header}</h3>
            <img className="player-image" src={`/images/${imagePath}`} alt={name} />
            <h4>{position}</h4>
            <p>{children}</p>
        </div>
    )
}