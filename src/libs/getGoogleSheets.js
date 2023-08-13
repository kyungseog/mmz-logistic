import { google } from "googleapis";
// import { DateTime } from "luxon";

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

export async function getInQuantityData() {
  try {
    const today = "2023-08-03"; //DateTime.now().toFormat("yyyy-Ll-dd");

    const range = "data!A1:M10000";
    const response = await getGoogleApis(range);
    const datas = response
      .filter((row) => row[2] === today)
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
        imageUrl: row[11],
        productCode: row[12],
      }));

    const suppliers = datas
      .map((data) => ({ supplierId: data.supplierCode, supplierNm: data.supplierNm }))
      .reduce(function (acc, cur) {
        if (acc.findIndex(({ supplierId }) => supplierId === cur.supplierId) === -1) {
          acc.push(cur);
        }
        return acc;
      }, []);

    return { today, datas, suppliers };
  } catch (err) {
    console.log(err);
  }
  return [];
}

export async function getSuppliersData() {
  try {
    const range = "infoSupplier!A1:B1000";
    const datas = await getGoogleApis(range);
    return datas;
  } catch (err) {
    console.log(err);
  }
  return [];
}
