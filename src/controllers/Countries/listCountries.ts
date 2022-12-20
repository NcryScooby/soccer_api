import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import { db } from "../../databases/db";

const listCountries = async (req: Request, res: Response) => {
  const SQL =
    "SELECT countries.id, country_name AS name, continents.continent_name AS continent, countries.country_logo AS flag FROM countries INNER JOIN continents ON continents.id = countries.continent_id ORDER by countries.country_name ASC;";

  try {
    const response = await db.promise().query<RowDataPacket[]>(SQL);
    res.status(200).json({
      total: response[0].length,
      countries: response[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error listing countries",
    });
  }
};

export { listCountries };
