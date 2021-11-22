function doGet(e) {
  regAcesso(); // Registra Acessos
  return HtmlService.createTemplateFromFile("home").evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

//function include(filename) {
//  return HtmlService.createHtmlOutputFromFile(filename)
//      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
//      .getContent();
//}

function userSair() {
  //var in_time = Utilities.formatDate(new Date(), "IST", "HH:mm:ss");
  //return HtmlService.createHtmlOutput("<h1>Teste - "+in_time+"</h1>").evaluate();
  return HtmlService.createHtmlOutput(
    "<script>window.top.location.href='http://www.google.com';</script>"
  );
}


function regAcesso() {
  var dataAtual = new Date();
  var email = Session.getActiveUser().getEmail();
  var url = "https://docs.google.com/spreadsheets/d/1IMMaybEkHYUTDqc6q8S71gzyd-TgDEAzY_FFng_GT2E/edit#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("acessos");

  ws.appendRow([email, dataAtual]);
}

function getTableData() {
  var dataAtual = new Date();
  var email = Session.getActiveUser().getEmail();
  var url = "https://docs.google.com/spreadsheets/d/1IMMaybEkHYUTDqc6q8S71gzyd-TgDEAzY_FFng_GT2E/edit#gid=0";
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("dados");
  var data = ws.getRange(3,2, ws.getLastRow()-1,5).getDisplayValues();
  var filtered = data.filter(function (row) {
    var d = new Date( row[2] ); // change text to Date object
    //Logger.log(d.getFullYear());    
    return row[0] === email; // then compare
    //return row[1];
  });

  //Logger.log(filtered);
  //Logger.log(JSON.stringify(filtered));
  return filtered;
}



