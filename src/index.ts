import express, {Request, Response } from "express"
import { authMiddleware } from "./authentication";
import User from "./models/db";

const PORT = process.env.PORT || 8080 

const app = express();
app.use(express.json());
app.use("api/v1/register", authMiddleware);

app.post("/api/v1/register", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUser = User.findOne(username, password);
    try {
        if(!existingUser) {
            User.create({
                username: username,
                password: password
            });

            res.json({
                message: "User Registered sucessfully"
            });

            return;
        }

    } catch(e) {
        res.status(403).json({
            message: "User already Registered"
        });
    }
});

app.post("/api/v1/Signup", (req, res) => {
    const user
})

app.listen(PORT, () => {
    console.log(`server is listening on the ${PORT}`);
});