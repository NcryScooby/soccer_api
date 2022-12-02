import { Request, Response } from "express";
import { db } from "../../databases/db";

const listPlayersByTeam = async (req: Request, res: Response) => {
  const { id } = req.params;

  const SQL = `SELECT players.id, players.player_name AS name, positions.position_name AS position, teams.team_name AS team, tournaments.tournament_name AS tournament FROM players INNER JOIN teams ON players.team_id = teams.id INNER JOIN tournaments ON teams.tournament_id = tournaments.id INNER JOIN countries ON teams.country_id = countries.id INNER JOIN continents ON countries.continent_id = continents.id INNER JOIN positions ON players.position_id = positions.id WHERE teams.id = ${id} ORDER BY players.player_name ASC;`;

  try {
    const response: any = await db.promise().query(SQL);
    if (response[0].length > 0) {
      res.status(200).json({
        team: response[0][0].team,
        total: response[0].length,
        players: response[0].map((player: any) => {
          return {
            id: player.id,
            name: player.name,
            position: player.position,
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
