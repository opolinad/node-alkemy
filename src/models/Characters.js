import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";

export const Characters = sequelize.define('characters', {
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    history: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});