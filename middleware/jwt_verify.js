import jwt from "jsonwebtoken"


function verify_user(req, res, next) {
    let token = req.cookies.token

    jwt.verify(token, 'secret', function (err, decoded) {
        console.log(decoded) // bar
        if (!decoded) {
            console.log("Empty");
            return res.json("You must logged in")
        }
        else {
            req.body.user_data = decoded
            next()

            //should I search for the email in database after jwt verify?
        }
    });
}

export default verify_user