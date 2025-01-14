"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("./authentication");
const db_1 = __importDefault(require("./models/db"));
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("api/v1/register", authentication_1.authMiddleware);
app.post("/api/v1/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const existingUser = db_1.default.findOne(username, password);
    try {
        if (!existingUser) {
            db_1.default.create({
                username: username,
                password: password
            });
            res.json({
                message: "User Registered sucessfully"
            });
            return;
        }
    }
    catch (e) {
        res.status(403).json({
            message: "User already Registered"
        });
    }
}));
app.listen(PORT, () => {
    console.log(`server is listening on the ${PORT}`);
});
