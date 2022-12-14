import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import { db } from "../../databases/db";

const listTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const SQL = `SELECT teams.id, teams.team_name AS name, c.country_name AS country, t.tournament_name AS tournament, teams.team_logo AS logo FROM teams INNER JOIN countries AS C ON teams.country_id = c.id INNER JOIN tournaments AS t ON teams.tournament_id = t.id WHERE teams.id = '${id}';`;

  try {
    const response = await db.promise().query<RowDataPacket[]>(SQL);

    if (response[0].length === 0) {
      return res.status(404).json({
        error: "Team not found",
      });
    }
    res.status(200).json({
      team: response[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error listing team",
    });
  }
};

export { listTeamById };
