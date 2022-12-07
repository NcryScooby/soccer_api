import { Request, Response } from "express";
import { db } from "../../databases/db";

const listTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const SQL = `SELECT * FROM teams WHERE id = '${id}'`;

  try {
    const response: any = await db.promise().query(SQL);

    if (response[0].length === 0) {
      return res.status(404).json({
        error: "Team not found",
      });
    }
    res.status(200).json({
      team: response[0],
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      error: "Error listing team",
    });
  }
};

export { listTeamById };
