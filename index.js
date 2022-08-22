import server from "./src/app.js";
import { sequelize as conn } from "./src/utils/db.js";
import dotenv from "dotenv";

dotenv.config();

conn.sync().then(() => {
    console.log(`Conected to DB: ${process.env.DB_NAME}`);
    server.listen(process.env.PORT, () => {
        console.log(`Listening at port: ${process.env.PORT}`);
    });
});
