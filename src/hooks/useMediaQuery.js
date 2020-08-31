import { useState, useEffect } from 'react'

// Returns a boolean stating whether the media query is true or false

export const useMediaQuery = (mediaQuery) => {


    const [isVerified, setIsVerified] = useState(typeof window !== "undefined" ? !!window.matchMedia(mediaQuery).matches : null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mediaQueryList = window.matchMedia(mediaQuery)
            const documentChangeHandler = () => setIsVerified(!!mediaQueryList.matches)

            mediaQueryList.addListener(documentChangeHandler)

            documentChangeHandler()
            return () => {
                mediaQueryList.removeListener(documentChangeHandler)
            }

        }

        return null
    }, [mediaQuery])

    return isVerified

}