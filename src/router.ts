import { Router } from "express";
import { listTeams } from "./controllers/Team/listTeams";
import { createTeam } from "./controllers/Team/createTeam";
import { listTeamsForTournament } from "./controllers/Team/listTeamForTournament";

const router = Router();

// List all teams
router.get("/teams", listTeams);

// Create a team
router.post("/teams", createTeam);

// List all teams for a tournament
router.get("/teams/:id", listTeamsForTournament);

export { router };
