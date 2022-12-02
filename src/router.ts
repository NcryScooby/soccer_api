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

const router = Router();

const upload = (name: string) =>
  multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, path.resolve(__dirname, "..", "uploads", `${name}`));
      },
      filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    }),
  });

// List all teams
router.get("/teams", listTeams);

// Create a team
router.post("/teams", upload("teams").single("image"), createTeam);

// List all teams by tournament
router.get("/teams/:id", listTeamsByTournament);

// List all players
router.get("/players", listPlayers);

// Create a player
router.post("/players", createPlayer);

// List all players by tournament
router.get("/players/tournament/:id", listPlayersByTournament);

// List all players by team
router.get("/players/team/:id", listPlayersByTeam);

// List all tournaments
router.get("/tournaments", listTournaments);

// List tournaments by continent
router.get("/tournaments/continent/:id", listTournamentByContinent);

// Create a tournament
router.post("/tournaments", createTournament);

// List all countries
router.get("/countries", listCountries);

// Create a country
router.post("/countries", upload("countries").single("image"), createCountry);

export { router };
