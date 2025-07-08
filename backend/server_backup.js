import express from "express";
import dbConnect from "./config/dbConnect.js";
import dotenv from "dotenv";
import jsonwebtoken from 'jsonwebtoken';
import User from "./models/Register.model.js";
import PrivateAuth from "./middleware/jwt.middleware.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('server page loaded...', req.params, res);
})

// ----------register ---------
app.post('/register', async (req, res) => {
    try {
        const { email, password, cpassword } = req.body;

        const ExistEmail = await User.findOne({ email });

        if (!email) {
            return res.status(400).send("Please enter all details");
        }
        else if (!password) {
            return res.status(400).send("Please enter password");
        }
        else if (!cpassword) {
            return res.status(400).send("Please enter confirm password");
        }
        else {
            if (ExistEmail) {
                return res.status(400).send("Email already available");
            }
            if (password !== cpassword) {
                return res.status(400).send("Password not matched");
            }
        }

        let newUser = new User({
            email,
            password,
            cpassword
        });
        await newUser.save();
        return res.status(200).send("User Registered Successfully");
    } catch (error) {
        console.log('server error', error);
        return res.status(500).send("Server Error");
    }
})
// -----------------------------
// ------------ login ---------------
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const exitEmail = await User.findOne({ email });
        if (!exitEmail) {
            return res.status(400).send("Email Not Found");
        }
        if (exitEmail.password !== password) {
            return res.status(400).send("Wrong Password");
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
        return res.status(500).send("Server Error");
    }
})
// -----------------------------------

// ------------home redirect ------------
app.get('/home', PrivateAuth, async (req, res) => {
    try {
        const existID = await User.findById(req.user.id);
        if (!existID) {
            res.status(400).send("User Not Found");
        }
        res.json(existID);
    } catch (error) {
        console.log('server error', error);
        return res.status(500).send("Server Error");
    }
})
// --------------------------------------


app.listen(PORT, () => {
    dbConnect();
    console.log(`server started at...http://localhost:${PORT}`,);
})