import { google } from "googleapis";
// import { DateTime } from "luxon";

export async function getGoogleSheets() {
  try {
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
      range: "data!A1:L10000",
    });
    const datas = response.data.values;
    const headline = [
      datas[0][1],
      datas[0][4],
      datas[0][5],
      datas[0][6],
      datas[0][7],
      datas[0][8],
      datas[0][9],
      datas[0][10],
    ];
    const today = "2023-08-03"; //DateTime.now().toFormat("yyyy-Ll-dd");
    const selectedDatas = datas.filter((row) => row[2] === today);
    const todayDatas = selectedDatas.map((data) => [
      data[1],
      data[4],
      data[5],
      data[6],
      data[7],
      data[8] ?? "",
      data[9] ?? "",
      data[10] ?? "",
    ]);

    const suppliers = selectedDatas.map((row) => ({ supplierId: row[0], supplierNm: row[3] }));
    const uniqueSuppliers = suppliers.reduce(function (acc, cur) {
      if (acc.findIndex(({ supplierId }) => supplierId === cur.supplierId) === -1) {
        acc.push(cur);
      }
      return acc;
    }, []);

    return { today, headline, todayDatas, uniqueSuppliers };
  } catch (err) {
    console.log(err);
  }
  return [];
}
