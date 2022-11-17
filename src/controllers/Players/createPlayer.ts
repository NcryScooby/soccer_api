import { Request, Response } from "express";
import { db } from "../../databases/db";

const createPlayer = async (req: Request, res: Response) => {
  const { player_name, player_position, player_team } = req.body;

  const SQL = `SELECT player_name FROM players WHERE player_name = '${player_name}';`;

  db.query(SQL, (error: string, result: string) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        error: "Error inserting player",
      });
    } else if (result.length > 0) {
      res.status(409).json({
        error: "Player already exists",
      });
    } else {
      const SQL = `INSERT INTO players (player_name, player_position, player_team) VALUES ('${player_name}', '${player_position}', '${player_team}');`;

      db.query(SQL, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: "Error inserting Player",
          });
        }
        res.status(201).json({
          success: "Player created",
        });
      });
    }
  });
};

export { createPlayer };
