import { useEffect } from 'react'

export const useBodyScrollLock = () => {
    useEffect(() => {

        const body = document.querySelector('body')

        body.style.position = 'fixed'

        return () => {
            body.style.position = 'static'
        }
    }, [])
}