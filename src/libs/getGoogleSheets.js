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
      range: "aug!A1:K2000",
    });
    const datas = response.data.values;
    const headline = datas[0];
    const today = "2023-08-03"; //DateTime.now().toFormat("yyyy-Ll-dd");
    const selectedDatas = datas.filter((row) => row[2] === today);
    return { headline, selectedDatas };
  } catch (err) {
    console.log(err);
  }
  return [];
}
