import { Characters, Movies, Genres } from "../models/index.js";
import { Op } from "sequelize";

export const getAllMovies = async (name, genre, order) => {
    try {
        let options = {};
        if (name) {
            options.where = {
                title: {
                    [Op.iLike]: "%" + name + "%"
                }
            };
        }
        if (genre) {
            options.include = {
                model: Genres,
                where: {
                    id:genre
                }
            }
        }
        let movies = await Movies.findAll(options);
        order === "ASC" && movies.sort((a, b) => new Date (a.title) < new Date (b.title) ? 1 : -1);
        order === "DESC" && movies.sort((a, b) => new Date (a.title) > new Date (b.title) ? 1 : -1);
        return { status: true, data: movies.map(movie => ({ imagen: movie.image, title: movie.title, creationDate:movie.creation_date })) };
    } catch (error) {
        console.error(error);
        return { status: false, msg: "Hubo un error obteniendo la lista de las películas" };
    }

}

export const createMovie = async (movieObj) => {
    try {
        let movie = await Movies.create(movieObj);
        movieObj.characters.forEach(character => movie.addCharacter(character));
        movieObj.genres.forEach(genre => movie.addGenre(genre));
        return { status: true, data: movie };
    } catch (error) {
        console.error(error);
        return { status: false, msg: "Hubo un error creando la película, verifique los parámetros de creación" };
    }
}

export const updateMovie = async (id, movieObj) => {
    try {
        await Movies.update(movieObj, { where: { id } });
        return { status: true, data: "La película fue actualizada exitosamente" };
    } catch (error) {
        console.error(error);
        return { status: false, msg: "Hubo un error actualizando la información de la película, verifique los parámetros" };
    }
}

export const deleteMovie = async (id) => {
    try {
        await Movies.destroy({ where: { id } });
        return { status: true, data: "La película fue borrada exitosamente" };
    } catch (error) {
        console.error(error);
        return { status: false, msg: "Hubo un error borrando la película" };
    }
}

export const getMovieById = async (id) => {
    try {
        let movie = await Movies.findByPk(id, { include: [{ model: Characters }, { model: Genres }]});
        return { status: true, data: movie };
    } catch (error) {
        console.error(error);
        return { status: false, msg: "Hubo un error encontrando la película, verifique el id" };
    }
}