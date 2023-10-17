import { google } from "googleapis";

async function getGoogleApis(range) {
  const target = ["https://www.googleapis.com/auth/spreadsheets"];
  const jwt = new google.auth.JWT(
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    null,
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

export async function getIncomingGoods(today) {
  try {
    const incomingGoodsRange = "incomingGoods!A1:P30000";
    const resIncomingGoods = await getGoogleApis(incomingGoodsRange);
    const incomingGoods = resIncomingGoods
      .filter((row) => row[2] === today)
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
        notYetIncome: row[12],
        imageUrl: row[13],
        productCode: row[14],
        optionCode: row[15],
      }));
    const suppliers = [...new Set(incomingGoods.map((data) => data.supplierCode))];
    return { incomingGoods, suppliers };
  } catch (err) {
    console.log(err);
  }
  return [];
}

export async function getInfoIssueLists() {
  try {
    const range = "infoLists!C2:C20";
    const issueLists = await getGoogleApis(range);
    return issueLists;
  } catch (err) {
    console.log(err);
  }
  return [];
}

export async function getInfoCheckers() {
  try {
    const range = "infoLists!A2:A20";
    const checkers = await getGoogleApis(range);
    return checkers;
  } catch (err) {
    console.log(err);
  }
  return [];
}
