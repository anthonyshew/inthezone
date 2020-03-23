import { useState, useEffect } from 'react'

export default (mediaQuery) => {

    if (typeof window !== 'undefined') {
        const [isVerified, setIsVerified] = useState(!!window.matchMedia(mediaQuery).matches)

        useEffect(() => {
            const mediaQueryList = window.matchMedia(mediaQuery)
            const documentChangeHandler = () => setIsVerified(!!mediaQueryList.matches)

            mediaQueryList.addListener(documentChangeHandler)

            documentChangeHandler()
            return () => {
                mediaQueryList.removeListener(documentChangeHandler)
            }
        }, [mediaQuery])

        return isVerified
    }
    return null
}