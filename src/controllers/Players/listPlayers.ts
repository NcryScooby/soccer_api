import { Request, Response } from "express";
import { db } from "../../databases/db";

const listPlayers = async (req: Request, res: Response) => {
  const SQL =
    "SELECT players.id, players.player_name, positions.position_name, teams.team_name, tournaments.tournament_name FROM players LEFT JOIN teams ON players.player_team = teams.id LEFT JOIN tournaments ON teams.tournament_id = tournaments.id LEFT JOIN countrys ON teams.country_id = countrys.id LEFT JOIN continents ON countrys.continent_id = continents.id LEFT JOIN positions ON players.player_position = positions.id ORDER BY players.player_name ASC;";

  try {
    const response: any = await db.promise().query(SQL);
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
