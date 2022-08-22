import { Characters } from "./Characters.js";
import { Movies } from "./Movies.js";
import { Genres } from "./Genres.js";

Characters.belongsToMany(Movies, { through: "Characters-Movies" });
Movies.belongsToMany(Characters, { through: "Characters-Movies" });

Genres.belongsToMany(Movies, { through: "Genres-Movies" });
Movies.belongsToMany(Genres, { through: "Genres-Movies" });

export { Characters, Movies, Genres}