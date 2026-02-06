function respond(req, res, status, content) {
    let str;
    let type;

    if (req.acceptedTypes[0] === "text/xml") {
        type = "text/xml";
        str = `
        <response>
            <message>${content.message}</message>
            <id>${content.id}</id>
        </response>
        `;
    } else {
        type = "application/json";
        str = JSON.stringify(content);
    }

    res.writeHead(status, {
        "Content-Type": type,
        "Content-Length": Buffer.byteLength(str, "utf8")
    });
    res.write(str);
    res.end();
}

function success(req, res) {
    const status = 200;
    const content = {
        message: "waow you did it right",
        id: "success"
    };

    respond(req, res, status, content);
}

function badRequest(req, res) {
    let status = 400;
    const content = {
        message: "requrest is bad this is BAD!!!",
        id: "badRequest"
    }

    if (req.query.valid === "true") {
        content.message = "nvm you valid :)";
        content.id = "success";
        status = 200;
    }

    respond(req, res, status, content);
}

function unauthorized(req, res) {
    let status = 401;
    const content = {
        message: "girl you can't be here....",
        id: "unauthorized"
    };

    if (req.query.loggedIn === "yes") {
        content.message = "girl welcome .... WELCOME...........";
        content.id = "success";
        status = 200;
    }

    respond(req, res, status, content);
}

function forbidden(req, res) {
    const status = 403;
    const content = {
        message: "you are FORBIDDEN from being herhere",
        id: "forbidden"
    };

    respond(req, res, status, content);
}

function internal(req, res) {
    const status = 500;
    const content = {
        message: "internal server error or wrhaetever <3",
        id: "internal"
    };

    respond(req, res, status, content);
}

function notImplemented(req, res) {
    const status = 501;
    const content = {
        message: "not implemented dude!!!! this was never implemented!!! thats bad!!!",
        id: "notImplemented"
    };

    respond(req, res, status, content);
}

function notFound(req, res) {
    const status = 404;
    const content = {
        message: "The page you were looking for was not found D: !!!",
        id: "notFound"
    };

    respond(req, res, status, content);
}

module.exports = {
    success,
    badRequest,
    unauthorized,
    internal,
    forbidden,
    notImplemented,
    notFound
}
