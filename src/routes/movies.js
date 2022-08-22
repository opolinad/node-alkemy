import { Router } from "express";
import { getAllMovies, createMovie, deleteMovie, getMovieById, updateMovie } from "../controllers/moviesController.js";

const router = Router();

router.route("/")
    .get(async (req, res) => {
        const { name, genre, order } = req.query;
        let response = await getAllMovies( name, genre, order);
        if (response.status) return res.status(200).send(response.data);
        res.status(400).send(response.msg);
    })
    .post(async (req, res) => {
        const { movieObj } = req.body;
        let response = await createMovie(movieObj);
        if (response.status) return res.status(201).send(response.data);
        res.status(400).send(response.msg);
    });

router.route("/:id")
    .put(async (req, res) => {
        const { movieObj } = req.body;
        const { id } = req.params;
        let response = await updateMovie(id, movieObj);
        if (response.status) return res.status(201).send(response.data);
        res.status(400).send(response.msg);
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        let response = await deleteMovie(id);
        if (response.status) return res.status(200).send(response.data);
        res.status(400).send(response.msg);
    })
    .get(async (req, res) => {
        const { id } = req.params;
        let response = await getMovieById(id);
        if (response.status) return res.status(200).send(response.data);
        res.status(400).send(response.msg);
    });

export default router;