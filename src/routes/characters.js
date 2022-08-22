import { Router } from "express";
import { getAllCharacters, createCharacter, updateCharacter, deleteCharacter, getCharacterById } from "../controllers/charactersController.js";

const router = Router();

router.route("/")
    .get(async (req, res) => {
        // let name, age, movies = null;
        const { name, age, movies } = req.query;
        let response = await getAllCharacters(name, age, movies);
        if (response.status) return res.status(200).send(response.data);
        res.status(400).send(response.msg);
    })
    .post(async (req, res) => {
        const { characterObj } = req.body;
        let response = await createCharacter(characterObj);
        if (response.status) return res.status(201).send(response.data);
        res.status(400).send(response.msg);
    });

router.route("/:id")
    .put(async (req, res) => {
        const { characterObj } = req.body;
        const { id } = req.params;
        let response = await updateCharacter(id, characterObj);
        if (response.status) return res.status(201).send(response.data);
        res.status(400).send(response.msg);
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        let response = await deleteCharacter(id);
        if (response.status) return res.status(200).send(response.data);
        res.status(400).send(response.msg);
    })
    .get(async (req, res) => {
        const { id } = req.params;
        let response = await getCharacterById(id);
        if (response.status) return res.status(200).send(response.data);
        res.status(400).send(response.msg);
    });

export default router;