import { Users } from "../models/Users.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const salt = process.env.SALT;
const secret = process.env.SECRET;
const expires = process.env.EXPIRES;

export const saveUser = async (user) => {
    const { username, password } = user;
    try {
        let userFound = await Users.findAll({ where: { username } });
        if (userFound.length) return "El usuario ya existe";
        let passwordHash = await bcrypt.hash(password, Number(salt));
        Users.create({ username, password: passwordHash });
    } catch (error) {
        return error;
    }
}

export const verifyCredentials = async (user) => {
    const { username, password } = user;
    try {
        let userFound = await Users.findAll({ where: { username } });
        if (!userFound.length) return "El usuario no existe";
        let compare = await bcrypt.compare(password, userFound[0].password);
        if (compare) {
            return ({ username, token: jwt.sign({ username }, secret, { expiresIn: expires }) });
        } else {
            return "Las credenciales son incorrectas";
        }
    } catch (error) {
        return error;
    }
}

export const authenticate = (req, res, next) => {
    let token  = req.headers.authorization;
    if (token) {
        token = token.slice(7);
        try {
            jwt.verify(token, secret);
            next();
        } catch (error) {
            return res.status(401).send("El token no es correcto");
        }
    } else {
        return res.status(401).send("Falta el token para acceder al recurso");
    }
}