import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import { db } from "../../databases/db";

const listPlayers = async (req: Request, res: Response) => {
  const SQL =
    "SELECT players.id, players.player_name AS name, positions.position_name AS position, teams.team_name AS team, tournaments.tournament_name AS tournament, c.country_name AS nationality FROM players INNER JOIN teams ON players.team_id = teams.id INNER JOIN tournaments ON teams.tournament_id = tournaments.id INNER JOIN countries ON teams.country_id = countries.id INNER JOIN continents ON countries.continent_id = continents.id INNER JOIN positions ON players.position_id = positions.id INNER JOIN countries AS c ON players.nationality_id = c.id ORDER BY players.player_name ASC;";

  try {
    const response = await db.promise().query<RowDataPacket[]>(SQL);
    res.status(200).json({
      total: response[0].length,
      players: response[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error listing players",
    });
  }
};

export { listPlayers };
