import { Request, Response } from "express";
import { db } from "../../databases/db";

const listTournamentById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const SQL = `SELECT tournaments.id, tournament_name AS name, countries.country_name AS country, tournament_logo AS logo, tournament_description AS description FROM tournaments INNER JOIN countries ON tournaments.country_id = countries.id WHERE tournaments.id = '${id}';`;

  try {
    const response: any = await db.promise().query(SQL);

    if (response[0].length === 0) {
      return res.status(404).json({
        error: "Tournament not found",
      });
    }
    res.status(200).json({
      tournament: response[0],
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      error: "Error listing tournament",
    });
  }
};

export { listTournamentById };
