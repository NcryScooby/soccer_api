import { Request, Response } from "express";
import { db } from "../../databases/db";

const listPlayersByTeam = async (req: Request, res: Response) => {
  const { id } = req.params;

  const SQL = `SELECT players.id, players.player_name, positions.position_name, teams.team_name, tournaments.tournament_name FROM players LEFT JOIN teams ON players.player_team = teams.id LEFT JOIN tournaments ON teams.tournament_id = tournaments.id LEFT JOIN countrys ON teams.country_id = countrys.id LEFT JOIN continents ON countrys.continent_id = continents.id LEFT JOIN positions ON players.player_position = positions.id WHERE teams.id = '${id}' ORDER BY players.player_name ASC;`;

  try {
    const response: any = await db.promise().query(SQL);
    if (response[0].length > 0) {
      res.status(200).json({
        team: response[0][0].team_name,
        total: response[0].length,
        players: response[0].map((player: any) => {
          return {
            id: player.id,
            player_name: player.player_name,
            position_name: player.position_name,
          };
        }),
      });
    } else {
      res.status(404).json({
        error: "Team not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error listing players",
    });
  }
};

export { listPlayersByTeam };
