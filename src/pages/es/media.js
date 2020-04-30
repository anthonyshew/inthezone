export default function NotFound() {
    if (typeof window !== 'undefined') {
        window.location = '/media'
    }

    return null
}