import { Request, Response } from "express";
import { db } from "../../databases/db";

const createTeam = (req: Request, res: Response) => {
  const imagePath = req.file?.filename;
  const { team_name, country_id, tournament_id } = req.body;

  if (!team_name || !country_id || !tournament_id || !imagePath) {
    return res.status(400).json({
      error: "Please fill out all fields",
    });
  }

  const SQL = `SELECT team_name FROM teams WHERE team_name = '${team_name}';`;

  db.query(SQL, (error: any, result: any) => {
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
      const SQL = `INSERT INTO teams (team_name, country_id, tournament_id, team_logo) VALUES ('${team_name}', '${country_id}', '${tournament_id}', '${imagePath}');`;

      db.query(SQL, (error: any, result: any) => {
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
