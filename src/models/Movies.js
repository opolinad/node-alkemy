import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";

export const Movies = sequelize.define('movies', {
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creation_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    score: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            max: 5,
            min: 1
        }
    }
});