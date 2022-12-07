import { Request, Response } from "express";
import { db } from "../../databases/db";

const listTournamentById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const SQL = `SELECT * FROM tournaments WHERE id = '${id}'`;

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
