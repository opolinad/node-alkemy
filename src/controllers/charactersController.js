import { Movies, Characters } from "../models/index.js";
import { Op } from "sequelize";

export const getAllCharacters = async (name, age, movies) => {
    try {
        let options = {};
        (name || age ) && (options.where = {});
        name && (options.where.name = {
            [Op.iLike]: "%" + name + "%"
        });
        age && (options.where.age = age);
        if (movies) {
            options.include = {
                model: Movies,
                where: {
                    id:movies
                }
            }
        }
        let characters = await Characters.findAll(options);
        return { status: true, data: characters.map(character => ({ imagen: character.image, nombre: character.name })) };
    } catch (error) {
        console.error(error);
        return { status: false, msg: "Hubo un error obteniendo la lista de los personajes" };
    }

}

export const createCharacter = async (characterObj) => {
    try {
        let character = await Characters.create(characterObj);
        return { status: true, data: character };
    } catch (error) {
        console.error(error);
        return { status: false, msg: "Hubo un error creando al personaje, verifique los parámetros de creación" };
    }
}

export const updateCharacter = async (id, characterObj) => {
    try {
        let character = await Characters.update(characterObj, { where: { id } });
        return { status: true, data: "El personaje fue actualizado exitosamente" };
    } catch (error) {
        console.error(error);
        return { status: false, msg: "Hubo un error actualizando la información del personaje, verifique los parámetros" };
    }
}

export const deleteCharacter = async (id) => {
    try {
        await Characters.destroy({ where: { id } });
        return { status: true, data: "El usuario fue borrado exitosamente" };
    } catch (error) {
        console.error(error);
        return { status: false, msg: "Hubo un error borrando el personaje" };
    }
}

export const getCharacterById = async (id) => {
    try {
        let character = await Characters.findByPk(id, {include:Movies});
        return { status: true, data: character };
    } catch (error) {
        console.error(error);
        return { status: false, msg: "Hubo un error encontrando al personaje, verifique el id" };
    }
}