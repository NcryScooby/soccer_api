import { Router } from "express";
import multer from "multer";
import path from "node:path";

import { listTeams } from "./controllers/Teams/listTeams";
import { createTeam } from "./controllers/Teams/createTeam";
import { listTeamsByTournament } from "./controllers/Teams/listTeamByTournament";
import { listPlayers } from "./controllers/Players/listPlayers";
import { createPlayer } from "./controllers/Players/createPlayer";
import { listPlayersByTournament } from "./controllers/Players/listPlayersByTournament";
import { listPlayersByTeam } from "./controllers/Players/listPlayersByTeam";
import { listTournaments } from "./controllers/Tournaments/listTournaments";
import { listTournamentByContinent } from "./controllers/Tournaments/listTournamentByContinent";
import { createTournament } from "./controllers/Tournaments/createTournament";
import { createCountry } from "./controllers/Countries/createCountry";
import { listCountries } from "./controllers/Countries/listCountries";
import { login } from "./controllers/security/login";
import { register } from "./controllers/security/register";
import { tokenMiddleware } from "./middlewares/token";
import { validateToken } from "./controllers/security/validateToken";
import { listTeamById } from "./controllers/Teams/listTeamById";
import { listTournamentById } from "./controllers/Tournaments/listTournamentById";

const router = Router();

const upload = (folder: string) =>
  multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, path.resolve(__dirname, "..", "uploads", `${folder}`));
      },
      filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    }),
  });

//@ Auth Routes
// Login
router.post("/login", login);

// Register
router.post("/register", register);

// Validate token
router.post("/validateToken", validateToken);

//@ Teams Routes
// List all teams
router.get("/teams", tokenMiddleware, listTeams);

// List teams for register, no token required
router.get("/teams/register", listTeams);

// List team by id
router.get("/teams/:id", tokenMiddleware, listTeamById);

// Create a team
router.post(
  "/teams",
  tokenMiddleware,
  upload("teams").single("image"),
  createTeam
);

// List all teams by tournament
router.get("/teams/tournament/:id", tokenMiddleware, listTeamsByTournament);

//@ Players Routes
// List all players
router.get("/players", tokenMiddleware, listPlayers);

// Create a player
router.post("/players", tokenMiddleware, createPlayer);

// List all players by tournament
router.get("/players/tournament/:id", tokenMiddleware, listPlayersByTournament);

// List all players by team
router.get("/players/team/:id", tokenMiddleware, listPlayersByTeam);

//@ Tournaments Routes
// List all tournaments
router.get("/tournaments", tokenMiddleware, listTournaments);

// List tournament by id
router.get("/tournaments/:id", tokenMiddleware, listTournamentById);

// List tournaments by continent
router.get(
  "/tournaments/continent/:id",
  tokenMiddleware,
  listTournamentByContinent
);

// Create a tournament
router.post(
  "/tournaments",
  tokenMiddleware,
  upload("tournaments").single("image"),
  createTournament
);

//@ Countries Routes
// List all countries
router.get("/countries", tokenMiddleware, listCountries);

// Create a country
router.post(
  "/countries",
  tokenMiddleware,
  upload("countries").single("image"),
  createCountry
);

export { router };
