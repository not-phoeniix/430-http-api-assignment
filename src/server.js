const http = require("http");
const clientHandler = require("./clientResponses.js");
const apiHandler = require("./apiResponses.js");

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

const routes = {
    "/": clientHandler.serveIndex,
    "/client.html": clientHandler.serveIndex,
    "/success": apiHandler.success,
    "/badRequest": apiHandler.badRequest,
    "/unauthorized": apiHandler.unauthorized,
    "/forbidden": apiHandler.forbidden,
    "/internal": apiHandler.internal,
    "/notImplemented": apiHandler.notImplemented,
    "/style.css": clientHandler.serveStyle,
    notFound: apiHandler.notFound
};

function onRequest(req, res) {
    const protocol = req.connection.encrypted ? "https" : "http";
    const url = new URL(req.url, `${protocol}://${req.headers.host}`);

    req.query = Object.fromEntries(url.searchParams);
    req.acceptedTypes = req.headers.accept?.split(",") ?? [];

    const route = routes[url.pathname];
    if (route) {
        route(req, res);
    } else {
        routes.notFound(req, res);
    }
}

http.createServer(onRequest).listen(PORT, () => {
    console.log(`Listening on 127.0.0.1:${PORT}`);
});
