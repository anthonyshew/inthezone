export default function NotFound() {
    if (typeof window !== 'undefined') {
        window.location = '/business-sponsors'
    }

    return null
}