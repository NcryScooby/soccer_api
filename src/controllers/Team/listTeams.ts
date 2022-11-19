import { Request, Response } from "express";
import { db } from "../../databases/db";

const listTeams = async (req: Request, res: Response) => {
  const SQL =
    "SELECT teams.id, teams.team_name, tournaments.tournament_name, countrys.country_name, continents.continent_name FROM teams LEFT JOIN tournaments ON teams.tournament_id = tournaments.id LEFT JOIN countrys ON teams.country_id = countrys.id LEFT JOIN continents ON countrys.continent_id = continents.id ORDER BY teams.team_name ASC;";

  try {
    const response: any = await db.promise().query(SQL);
    res.status(200).json({
      total: response[0].length,
      teams: response[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error listing teams",
    });
  }
};

export { listTeams };
