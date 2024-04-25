import express from "express";
import { sequelize } from "./postgresql.js";
import { movieModel } from "./movie.js";
import { movieInfoModel } from "./movieinfo.js";
import { Op } from "sequelize";
import cors from "cors";
import { watchlistModel } from "./watchlist.js";
import { userSchemaModel } from "./user.js";
import bcrypt from "bcrypt";
import session from "express-session";
import crypto from "crypto";

console.log("hello");

const app = express();

app.use(express.json());

const generateRandomString = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

const secretKey = generateRandomString(64);

app.use(
  session({
    secret: secretKey,
    resave: "false",
    saveUnintialized: "false",
  })
);

app.use(cors());
const Movie = movieModel(sequelize);
const Movieinfo = movieInfoModel(sequelize);
const Watchlist = watchlistModel(sequelize);
const UserDetails = userSchemaModel(sequelize);
const PORT = 3030;

app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await UserDetails.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserDetails.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({ message: "SignUp successful", user: newUser });
  } catch (error) {
    console.error("Error Signing Up:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserDetails.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Invalid Username or Password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Username or Password" });
    }
    req.session.user = { id: user.id, username: user.username };
    res.json({ message: "Login Successful", user: req.session.user });
  } catch (error) {
    console.error("Error Loggin in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/movies", async (req, res) => {
  try {
    const randomMovies = await Movie.findAll({
      order: sequelize.random(),
      limit: 10,
    });

    res.json(randomMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/search", async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;

    if (searchTerm === "") {
      const randomMovies = await Movie.findAll({
        order: sequelize.random(),
        limit: 10,
      });

      res.json(randomMovies);
      return;
    }

    const searchResults = await Movie.findAll({
      where: {
        title: {
          [Op.iLike]: `%${searchTerm}%`,
        },
      },
    });

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/movie/:imdbid", async (req, res) => {
  try {
    const { imdbid } = req.params;

    const movie = await Movieinfo.findOne({
      where: {
        imdbid: imdbid,
      },
    });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    const isInWatchlist = await Watchlist.findOne({
      where: {
        imdbid: imdbid,
      },
    });

    res.json({
      ...movie.toJSON(),
      isInWatchlist: Boolean(isInWatchlist),
    });
  } catch (error) {
    console.error("Error fetching movie information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/watchlist", async (req, res) => {
  try {
    const { title, imdbid, year, poster } = req.body;

    const existingMovie = await Watchlist.findOne({
      where: {
        imdbid: imdbid,
      },
    });

    if (existingMovie) {
      return res.status(400).json({ error: "Movie already in the watchlist" });
    }

    const newMovie = await Watchlist.create({
      imdbid,
      title,
      year,
      poster,
    });

    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error adding movie to watchlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.delete("/api/watchlist/:imdbid", async (req, res) => {
  try {
    const { imdbid } = req.params;

    const deletedMovie = await Watchlist.destroy({
      where: {
        imdbid: imdbid,
      },
    });

    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found in watchlist" });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error removing movie from watchlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/watchlist", async (req, res) => {
  try {
    const watchlistMovies = await Watchlist.findAll();

    res.json(watchlistMovies);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
