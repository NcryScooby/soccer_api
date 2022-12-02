import { Request, Response } from "express";
import { db } from "../../databases/db";

const listTeams = async (req: Request, res: Response) => {
  const SQL =
    "SELECT teams.id, teams.team_name AS team, tournaments.tournament_name AS tournament, countrys.country_name AS country, continents.continent_name AS continent, team_logo AS logo FROM teams INNER JOIN tournaments ON teams.tournament_id = tournaments.id INNER JOIN countrys ON teams.country_id = countrys.id INNER JOIN continents ON countrys.continent_id = continents.id ORDER BY teams.team_name ASC;";

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
