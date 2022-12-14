import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import { db } from "../../databases/db";

const listTeams = async (req: Request, res: Response) => {
  const SQL =
    "SELECT teams.id, teams.team_name AS name, tournaments.tournament_name AS tournament, countries.country_name AS country, continents.continent_name AS continent, team_logo AS logo FROM teams INNER JOIN tournaments ON teams.tournament_id = tournaments.id INNER JOIN countries ON teams.country_id = countries.id INNER JOIN continents ON countries.continent_id = continents.id ORDER BY teams.team_name ASC;";

  try {
    const response = await db.promise().query<RowDataPacket[]>(SQL);
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
