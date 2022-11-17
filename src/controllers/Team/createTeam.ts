import { Request, Response } from "express";
import { db } from "../../databases/db";

const createTeam = (req: Request, res: Response) => {
  const { team_name, country_id, tournament_id } = req.body;

  const SQL = `SELECT team_name FROM teams WHERE team_name = '${team_name}';`;

  db.query(SQL, (error: string, result: string) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        error: "Error creating team",
      });
    } else if (result.length > 0) {
      res.status(409).json({
        error: "Team already exists",
      });
    } else {
      const SQL = `INSERT INTO teams (team_name, country_id, tournament_id) VALUES ('${team_name}', '${country_id}', '${tournament_id}');`;

      db.query(SQL, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: "Error inserting team",
          });
        }
        res.status(201).json({
          success: "Team created",
        });
      });
    }
  });
};

export { createTeam };
