import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

type ItemList = {
  barCode: string;
  productCode: string;
  optionCode: string;
  productNm: string;
  optionNm: string;
};

async function getGoogleApis(range: string) {
  const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
  const jwt = new google.auth.JWT(
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    undefined,
    (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    target
  );

  const sheets = google.sheets({ version: "v4", auth: jwt });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range,
  });
  return response.data.values;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const range = "infoItem!B2:F200000";
    const response = await getGoogleApis(range);
    if (response) {
      const itemList: ItemList[] = response
        .filter((row: any) => row[1] === req.body.item)
        .map((row) => ({
          barCode: row[0],
          productCode: row[1],
          optionCode: row[2],
          productNm: row[3],
          optionNm: row[4],
        }));
      return res.status(200).send(JSON.stringify({ error: false, data: itemList }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}
