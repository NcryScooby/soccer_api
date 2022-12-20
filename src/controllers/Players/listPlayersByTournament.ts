import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import { db } from "../../databases/db";

const listPlayersByTournament = async (req: Request, res: Response) => {
  const { id } = req.params;

  const SQL = `SELECT players.id, players.player_name AS name, positions.position_name AS position, teams.team_name AS team, tournaments.tournament_name AS tournament FROM players LEFT JOIN teams ON players.team_id = teams.id LEFT JOIN tournaments ON teams.tournament_id = tournaments.id LEFT JOIN countries ON teams.country_id = countries.id LEFT JOIN continents ON countries.continent_id = continents.id LEFT JOIN positions ON players.position_id = positions.id WHERE tournaments.id = '${id}' ORDER BY players.player_name ASC;`;

  try {
    const response = await db.promise().query<RowDataPacket[]>(SQL);
    if (response[0].length > 0) {
      res.status(200).json({
        tournament: response[0][0].tournament,
        total: response[0].length,
        players: response[0].map((player) => {
          return {
            id: player.id,
            name: player.name,
            position: player.position,
            team: player.team,
          };
        }),
      });
    } else {
      res.status(404).json({
        error: "Tournament not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error listing players",
    });
  }
};

export { listPlayersByTournament };
