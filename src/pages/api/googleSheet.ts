import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { ItemList } from "@/types";

async function getGoogleApis(range: string) {
  const target = ["https://www.googleapis.com/auth/spreadsheets"];
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
    const incomingGoodsRange = "incomingGoods!A1:O10000";
    const infoItemsRange = "infoItems!B2:F200000";
    const resInfoItems = await getGoogleApis(infoItemsRange);
    const resIncomingGoods = await getGoogleApis(incomingGoodsRange);

    if (resIncomingGoods && resInfoItems) {
      const incomingGoods = resIncomingGoods
        .filter((row) => row[2] === req.body.today && row[13] === req.body.item)
        .map((row) => ({
          supplierCode: row[0],
          barCode: row[1],
          incomingDate: row[2],
          supplierNm: row[3],
          productNm: row[4],
          buyingProductNm: row[5],
          optionNm: row[6],
          orderQuantity: Number(row[7]),
          optionText: row[8],
          incomingQuantity: Number(row[9]),
          incomingIssueText: row[10],
          checker: row[11],
          imageUrl: row[12],
          productCode: row[13],
          optionCode: row[14],
        }));

      const infoItems: ItemList[] = resInfoItems
        .filter((row) => row[1] === req.body.item)
        .map((row) => ({
          supplierCode: "",
          barCode: row[0],
          incomingDate: "",
          supplierNm: "",
          productNm: row[3],
          buyingProductNm: "",
          optionNm: row[4],
          orderQuantity: 0,
          optionText: "",
          incomingQuantity: 0,
          incomingIssueText: "",
          checker: "",
          imageUrl: "",
          productCode: row[1],
          optionCode: row[2],
        }));

      const result = infoItems.map((item) => {
        const data = incomingGoods.filter((data) => data.barCode === item.barCode);
        if (data.length == 0) {
          return item;
        } else {
          return Object.assign(item, data[0]);
        }
      });
      return res.status(200).send(JSON.stringify({ error: false, data: result }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}
