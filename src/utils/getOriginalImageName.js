export const getOriginalImageName = (path) => {
    return path.split("/").pop()
}