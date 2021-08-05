function getText() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Progresión Stocks");
  var source = sheet.getRange("B3:O3");
  var values = source.getValues();
  var values2 = source.getFormulas();
  //values[0][1] = new Date();
  sheet.appendRow(["", new Date(), values[0][1], values[0][2], values[0][3], "", values2[0][5], values2[0][6], values2[0][7]]);

  var date = new Date();
  var progress_stocks = values[0][5] * 100;
  var progress_btc = values[0][6] * 100;
  var progress_total = values[0][7] * 100;
  var diff_yesterday = values[0][8] * 100;
  var diff_stocks = values[0][9] * 100;
  var diff_btc = values[0][10] * 100;
  var diff_total = values[0][11] * 100;

  var getrequest_text = "<b>" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "</b>\n" + "Acciones: \t" + values[0][1] + "€ || " + progress_stocks.toFixed(2) + "% || " + diff_stocks.toFixed(2) + "%\nBTC: \t\t\t" + values[0][2] + "€ || " + progress_btc.toFixed(2) + "% || " + diff_btc.toFixed(2) + "% \nTotal: " + values[0][3] + "€ || " + progress_total.toFixed(2) + "% || " + diff_yesterday.toFixed(2) + "%";

  if (isNaN(parseFloat(progress_stocks + progress_btc + progress_total + diff_yesterday + diff_stocks + diff_btc + diff_total))) {
    return "";
  }
  return getrequest_text;
};

function recordHistory() {


  var texttosend = getText();
  if (texttosend == "") {
    texttosend = getText();

    if (texttosend == "") {
      texttosend = getText();
    }
  }

  if (texttosend != "") {
    
    //getTelegramStringURL() defined in envvar.gs file (same project).
    // function getTelegramStringURL() {
    //  return 'https://api.telegram.org/bot333333333:AAAAAAAAAAA_AAAAAAAAAAAAAAAAAAAAAAA/sendMessage?chat_id=11111111&parse_mode=html&text=';
    //}

    var finalget = getTelegramStringURL() + encodeURI(texttosend);
    UrlFetchApp.fetch(finalget);
  }
};
