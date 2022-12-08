import { Request, Response } from "express";
import { db } from "../../databases/db";

const listTournamentByContinent = async (req: Request, res: Response) => {
  const { id } = req.params;

  const SQL = `
  SELECT t.id, t.tournament_name AS name, c.country_name AS country, cont.continent_name AS continent FROM tournaments AS t INNER JOIN countries AS c ON c.id = t.country_id INNER join continents AS cont ON c.continent_id = cont.id WHERE cont.id = ${id} ORDER BY t.tournament_name ASC;
  `;

  try {
    const response: any = await db.promise().query(SQL);
    if (response[0].length > 0) {
      res.status(200).json({
        continent: response[0][0].continent,
        total: response[0].length,
        tournaments: response[0].map((tournament: any) => {
          return {
            id: tournament.id,
            name: tournament.name,
            country: tournament.country,
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
      error: "Error listing Tournament",
    });
  }
};

export { listTournamentByContinent };
