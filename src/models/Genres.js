import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";

export const Genres = sequelize.define('genres', {
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});