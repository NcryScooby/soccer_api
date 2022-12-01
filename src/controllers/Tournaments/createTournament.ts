import { Request, Response } from "express";
import { db } from "../../databases/db";

const createTournament = (req: Request, res: Response) => {
  const { tournament_name, country_id } = req.body;

  if (!tournament_name || !country_id) {
    return res.status(400).json({
      error: "Please fill out all fields",
    });
  }

  const SQL = `SELECT tournament_name FROM tournaments WHERE tournament_name = '${tournament_name}';`;

  db.query(SQL, (error: any, result: any) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        error: "Error creating Tournament",
      });
    } else if (result.length > 0) {
      res.status(409).json({
        error: "Tournament already exists",
      });
    } else {
      const SQL = `INSERT INTO tournaments (tournament_name, country_id) VALUES ('${tournament_name}', '${country_id}');`;

      db.query(SQL, (error: any, result: any) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: "Error inserting Tournament",
          });
        }
        res.status(201).json({
          success: "Tournament created",
        });
      });
    }
  });
};

export { createTournament };
