// スプレッドシートのIDとシート名を設定
const SPREADSHEET_ID = '';
const SHEET_NAME = 'Scores';



// HTMLファイル（index.html）を返す
function doGet() {
 return HtmlService.createHtmlOutputFromFile('index')
   .setTitle('フルスクリーンゲーム')
   .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// スコア登録関数（フロントから送信）

function submitScore(name, score) {
 const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
 const numericScore = Number(score); // ← 追加
 sheet.appendRow([name, numericScore, new Date()]);
}
function getRanking() {
 try {
   const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
   const values = sheet.getDataRange().getValues();

   if (!values || values.length < 2) return [];

   const filtered = values
     .slice(1)
     .filter(row => row[0] && row[1])
     .sort((a, b) => b[1] - a[1])
     .slice(0, 10)
     .map(row => [row[0], row[1]]); // ← 日付を除去または加工

   return filtered;
 } catch (error) {
   console.error("getRanking 関数内でエラーが発生:", error);
   return null;
 }
}




