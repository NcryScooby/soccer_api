import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import { db } from "../../databases/db";
import { io } from "../../index";

const createTournament = (req: Request, res: Response) => {
  const imagePath = req.file?.filename;
  const { tournament_name, country_id, tournament_description } = req.body;

  if (!tournament_name || !country_id || !tournament_description) {
    return res.status(400).json({
      error: "Please fill out all fields",
    });
  }

  const SQL = `SELECT tournament_name FROM tournaments WHERE tournament_name = '${tournament_name}';`;

  db.query<RowDataPacket[]>(SQL, (error, result) => {
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
      const SQL = `INSERT INTO tournaments (tournament_name, country_id, tournament_logo, tournament_description) VALUES ('${tournament_name}', '${country_id}', '${imagePath}', '${tournament_description}');`;

      db.query(SQL, (error) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: "Error inserting Tournament",
          });
        }
        io.emit("tournaments@new");
        res.status(201).json({
          success: "Tournament created",
        });
      });
    }
  });
};

export { createTournament };
