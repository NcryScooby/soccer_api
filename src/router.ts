import { Router } from "express";
import { listTeams } from "./controllers/Team/listTeams";
import { createTeam } from "./controllers/Team/createTeam";
import { listTeamsByTournament } from "./controllers/Team/listTeamByTournament";
import { listPlayers } from "./controllers/Players/listPlayers";
import { createPlayer } from "./controllers/Players/createPlayer";
import { listPlayersByTournament } from "./controllers/Players/listPlayersByTournament";
import { listPlayersByTeam } from "./controllers/Players/listPlayersByTeam";

const router = Router();

// List all teams
router.get("/teams", listTeams);

// Create a team
router.post("/teams", createTeam);

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

export { router };
