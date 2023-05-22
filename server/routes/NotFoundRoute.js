export const pageNotFound = (res, req) => {
    res.status(404).send(
        "<h1>Page not found on the server</h1>")
}