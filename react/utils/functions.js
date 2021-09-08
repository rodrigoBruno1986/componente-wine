
//función para traer los links si se hace el menú con graphQl
export const substrUrl = (url) => {
    return url.split(`${window.location.protocol}//${window.location.host}`)[1]
}