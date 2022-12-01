import { Request, Response } from "express";
import { db } from "../../databases/db";

const listTournaments = async (req: Request, res: Response) => {
  const SQL =
    "SELECT t.id, t.tournament_name AS name, c.country_name AS country, cont.continent_name AS continent FROM tournaments AS t INNER JOIN countrys AS c ON c.id = t.country_id INNER join continents AS cont ON c.continent_id = cont.id ORDER BY t.tournament_name ASC;";

  try {
    const response: any = await db.promise().query(SQL);
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
