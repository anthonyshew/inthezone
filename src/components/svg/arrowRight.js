import React from 'react'

export default ({ fill, style }) => (
    <svg style={style} className="arrow" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path style={{ stroke: fill }} d="M5 30L50 30M50 30L27.546 5M50 30L27.546 55" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
    </svg>
)