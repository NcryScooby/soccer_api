import { Request, Response } from "express";
import { db } from "../../databases/db";

const listTeamsByTournament = async (req: Request, res: Response) => {
  const { id } = req.params;

  const SQL = `SELECT teams.id, teams.team_name, tournaments.tournament_name FROM teams LEFT JOIN tournaments ON teams.tournament_id = tournaments.id WHERE tournaments.id = '${id}' ORDER BY teams.team_name ASC;`;

  try {
    const reponse: any = await db.promise().query(SQL);
    if (reponse[0].length > 0) {
      res.status(200).json({
        tournment: reponse[0][0].tournament_name,
        total_teams: reponse[0].length,
        teams: reponse[0].map((team: any) => {
          return {
            id: team.id,
            team_name: team.team_name,
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
      error: "Error listing teams",
    });
  }
};

export { listTeamsByTournament };
