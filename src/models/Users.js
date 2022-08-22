import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";

export const Users = sequelize.define("Users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
});