import React from 'react'

export default () => {
    if (typeof window !== 'undefined') {
        window.location = '/legal/privacy-policy';
    }

    return null
}