import jsonwebtoken from 'jsonwebtoken';

const PrivateAuth = (req, res, next) => {
    try {
        let token = req.header('x-token');
        if (!token) {
            return res.status(400).json({ success: false, message: "Token Not Found" });
        }
        let decode = jsonwebtoken.verify(token, 'jwtsecret');
        req.user = decode.user;
        next();

    } catch (error) {
        console.log('private auth error :', error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
export default PrivateAuth;