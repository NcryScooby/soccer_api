import { Request, Response } from "express";
import { db } from "../../databases/db";

const listTeamsByTournament = async (req: Request, res: Response) => {
  const { id } = req.params;

  const SQL = `SELECT teams.id, teams.team_name AS team, tournaments.tournament_name AS tournament, teams.team_logo AS logo FROM teams INNER JOIN tournaments ON teams.tournament_id = tournaments.id WHERE tournaments.id = ${id} ORDER BY teams.team_name ASC;`;

  try {
    const response: any = await db.promise().query(SQL);
    if (response[0].length > 0) {
      res.status(200).json({
        tournment: response[0][0].tournament,
        total_teams: response[0].length,
        teams: response[0].map((team: any) => {
          return {
            id: team.id,
            team: team.team,
            logo: team.logo,
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
