import { Request, Response } from "express";
import { db } from "../../databases/db";

const listTournaments = async (req: Request, res: Response) => {
  const SQL =
    "SELECT tournament_name from tournaments ORDER BY tournament_name ASC;";

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
