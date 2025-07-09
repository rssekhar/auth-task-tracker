import express from "express";
import dbConnect from "./config/dbConnect.js";
import dotenv from "dotenv";
import jsonwebtoken from 'jsonwebtoken';
import User from "./models/register.model.js";
import PrivateAuth from "./middleware/jwt.middleware.js";
import cors from "cors";

import router from "./appRouter.js"

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: "Server Loaded..." }, req.params, res);
})

// ----------register ---------
app.post('/register', async (req, res) => {
    try {
        const { email, password, cpassword } = req.body;

        const ExistEmail = await User.findOne({ email });

        if (!email) {
            return res.status(400).json({ success: false, message: "Please Fill All Details" });
        }
        else if (!password) {
            return res.status(400).json({ success: false, message: "Please Enter Password" });
        }
        else if (!cpassword) {
            return res.status(400).json({ success: false, message: "Please Enter Confirm Password" });
        }
        else {
            if (ExistEmail) {
                return res.status(400).json({ success: false, message: "Email Already Available" });
            }
            if (password !== cpassword) {
                return res.status(400).json({ success: false, message: "Password Not Matched" });
            }
        }

        let newUser = new User({
            email,
            password,
            cpassword
        });
        await newUser.save();
        return res.status(200).json({ success: true, message: "User Registered Successfully" });
    } catch (error) {
        console.log('server error', error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
})
// -----------------------------
// ------------ login ---------------
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const exitEmail = await User.findOne({ email });
        if (!exitEmail) {
            return res.status(400).json({ success: false, message: "Email Not Found" });
        }
        if (exitEmail.password !== password) {
            return res.status(400).json({ success: false, message: "Wrong Password" });
        }
        let payload = {
            user: {
                id: exitEmail.id
            }
        }
        // ------- generate jwt token to private routes
        jsonwebtoken.sign(payload, 'jwtsecret', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            return res.json({ email: exitEmail.id, token });
        });
        // ----------- jwt end-------------

    } catch (error) {
        console.log('server error', error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
})
// -----------------------------------

// ------------home redirect ------------
app.get('/home', PrivateAuth, async (req, res) => {
    try {
        const existID = await User.findById(req.user.id);
        if (!existID) {
            res.status(400).json({ success: false, message: "User Not Found" });
        }
        res.json(existID);
    } catch (error) {
        console.log('server error', error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
})
// --------------------------------------
// create an rest api
app.use("/tasks",router);

app.listen(PORT, () => {
    dbConnect();
    console.log(`server started at...http://localhost:${PORT}`,);
})
