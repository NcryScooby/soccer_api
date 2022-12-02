import { Request, Response } from "express";
import { db } from "../../databases/db";

const createCountry = (req: Request, res: Response) => {
  const imagePath = req.file?.filename;
  const { country_name, continent_id } = req.body;

  if (!country_name || !continent_id || !imagePath) {
    return res.status(400).json({
      error: "Please fill out all fields",
    });
  }

  const SQL = `SELECT country_name FROM countries WHERE country_name = '${country_name}';`;

  db.query(SQL, (error: any, result: any) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        error: "Error creating country",
      });
    } else if (result.length > 0) {
      res.status(409).json({
        error: "Country already exists",
      });
    } else {
      const SQL = `INSERT INTO countries (country_name, continent_id, country_logo) VALUES ('${country_name}', '${continent_id}', '${imagePath}');`;

      db.query(SQL, (error: any, result: any) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            error: "Error inserting country",
          });
        }
        res.status(201).json({
          success: "Country created",
        });
      });
    }
  });
};

export { createCountry };
