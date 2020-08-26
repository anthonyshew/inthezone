import { useEffect } from 'react'

export default (img) => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            let head = document.querySelector('head')
            let favicon = document.createElement('link')

            favicon.setAttribute('rel', 'shortcut icon')
            favicon.setAttribute('href', img)
            head.appendChild(favicon)
        }
    }, [img])
}