import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import { db } from "../../databases/db";

const createPlayer = async (req: Request, res: Response) => {
  const { player_name, position_id, team_id, nationality_id } = req.body;

  if (!player_name || !position_id || !team_id || !nationality_id) {
    return res.status(400).json({
      error: "Please fill out all fields",
    });
  }

  const SQL = `SELECT player_name FROM players WHERE player_name = '${player_name}';`;

  db.query<RowDataPacket[]>(SQL, (error, result) => {
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
      const SQL = `INSERT INTO players (player_name, position_id, team_id, nationality_id) VALUES ('${player_name}', '${position_id}', '${team_id}', '${nationality_id}');`;

      db.query(SQL, (error) => {
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
