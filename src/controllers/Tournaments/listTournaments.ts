import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import { db } from "../../databases/db";

const listTournaments = async (req: Request, res: Response) => {
  const SQL =
    "SELECT t.id, t.tournament_name AS name, c.country_name AS country, cont.continent_name AS continent, t.tournament_logo AS logo, t.tournament_description AS description FROM tournaments AS t INNER JOIN countries AS c ON c.id = t.country_id INNER join continents AS cont ON c.continent_id = cont.id ORDER BY t.tournament_name ASC;";

  try {
    const response = await db.promise().query<RowDataPacket[]>(SQL);
    res.status(200).json({
      total: response[0].length,
      tournaments: response[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error listing tournaments",
    });
  }
};

export { listTournaments };
