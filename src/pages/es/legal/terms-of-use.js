import React from 'react'

export default () => {
    if (typeof window !== 'undefined') {
        window.location = '/legal/terms-of-use';
    }

    return null
}