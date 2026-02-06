function respond(req, res, status, content) {
    let str;
    let type;

    if (req.acceptedTypes[0] === "text/xml") {
        type = "text/xml";
        str = "<response>";
        for (const key of Object.keys(content)) {
            if (content[key] !== undefined) {
                str += `<${key}>${content[key]}</${key}>`;
            }
        }
        str += "</response>";
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
        message: "This is a successful response.",
        id: "success"
    };

    respond(req, res, status, content);
}

function badRequest(req, res) {
    let status = 400;
    const content = {
        message: "Missing valid query parameter set to true.",
        id: "badRequest"
    }

    if (req.query.valid === "true") {
        content.message = "This request has the required parameters";
        content.id = undefined;
        status = 200;
    }

    respond(req, res, status, content);
}

function unauthorized(req, res) {
    let status = 401;
    const content = {
        message: "Missing loggedIn query parameter set to yes.",
        id: "unauthorized"
    };

    if (req.query.loggedIn === "yes") {
        content.message = "You have successfully viewed the content!";
        content.id = undefined;
        status = 200;
    }

    respond(req, res, status, content);
}

function forbidden(req, res) {
    const status = 403;
    const content = {
        message: "You do not have access to this content.",
        id: "forbidden"
    };

    respond(req, res, status, content);
}

function internal(req, res) {
    const status = 500;
    const content = {
        message: "Internal server error, something went wrong!",
        id: "internalError"
    };

    respond(req, res, status, content);
}

function notImplemented(req, res) {
    const status = 501;
    const content = {
        message: "A get request for this page has not been implemented yet. Check again later for updated content!",
        id: "notImplemented"
    };

    respond(req, res, status, content);
}

function notFound(req, res) {
    const status = 404;
    const content = {
        message: "The page you are looking for was not found",
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
