import { google } from "googleapis";

async function getGoogleApis(range) {
  const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
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

export async function getInQuantityData(targetDay) {
  try {
    const range = "data!A1:N10000";
    const response = await getGoogleApis(range);
    const datas = response
      .filter((row) => row[2] === targetDay)
      .map((row) => ({
        supplierCode: row[0],
        barCode: row[1],
        inDate: row[2],
        supplierNm: row[3],
        productNm: row[4],
        buyingProductNm: row[5],
        optionNm: row[6],
        orderQuantity: Number(row[7]),
        optionText: row[8],
        inQuantity: Number(row[9]),
        inIssueText: row[10],
        checker: row[11],
        imageUrl: row[12],
        productCode: row[13],
      }));
    const suppliers = [...new Set(datas.map((data) => data.supplierCode))];
    return { datas, suppliers };
  } catch (err) {
    console.log(err);
  }
  return [];
}

export async function getIssueList() {
  try {
    const range = "infoData!A2:A20";
    const issueList = await getGoogleApis(range);
    return issueList;
  } catch (err) {
    console.log(err);
  }
  return [];
}

export async function getCheckerList() {
  try {
    const range = "infoData!B2:B20";
    const checkers = await getGoogleApis(range);
    return checkers;
  } catch (err) {
    console.log(err);
  }
  return [];
}

export async function getItemList() {
  try {
    const range = "infoItem!B2:F200000";
    const response = await getGoogleApis(range);
    const itemList = response
      .filter((row) => row[1] === "N31MM010B42")
      .map((row) => ({
        barCode: row[0],
        productCode: row[1],
        optionCode: row[2],
        productNm: row[3],
        optionNm: row[4],
      }));
    return itemList;
  } catch (err) {
    console.log(err);
  }
  return [];
}
