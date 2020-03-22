import { useState, useEffect } from 'react'

export default (mediaQuery) => {
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