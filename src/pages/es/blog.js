export default function NotFound() {
    if (typeof window !== 'undefined') {
        window.location = '/blog'
    }

    return null
}