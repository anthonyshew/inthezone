import { useEffect } from 'react'

const useAnimateOnVisible = (options) => {
    useEffect(() => {
        if (!options.element) return console.error("No element specified for useAnimateOnVisible()")
        const observer = new IntersectionObserver(([entry]) => {
            const crossedBottomOfViewport = entry.boundingClientRect.y > entry.rootBounds.y
            const inView = entry.intersectionRatio > 0

            if (crossedBottomOfViewport && entry.isIntersecting) {
                console.log('in')
                options.element.current.classList.add(options.inClass ?? "in")
                options.element.current.classList.remove(options.outClass ?? "out")
            }

            if (crossedBottomOfViewport && !entry.isIntersecting) {
                console.log("out")
                options.element.current.classList.remove(options.inClass ?? "in")
                options.element.current.classList.add(options.outClass ?? "out")
            }

        }, {
            root: null,
            rootMargin: "0px",
            threshold: 0.1
        })

        if (options.element.current) {
            observer.observe(options.element.current)
        }

    }, [options.element, options.inClass, options.outClass])
}

export default useAnimateOnVisible