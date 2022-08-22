import { Router } from "express";
import { saveUser, verifyCredentials } from "../controllers/authController.js";

const router = Router();

router.post("/login", async (req, res) => {
    const { user } = req.body;
    let compare = await verifyCredentials(user);
    if (typeof compare !== "string") return res.status(200).json(compare);
    res.status(401).send(compare);
});

router.post("/register", async (req, res) => {
    const { user } = req.body;
    let save = await saveUser(user);
    if (save) res.status(400).send(save);
    res.sendStatus(201);
});

export default router;