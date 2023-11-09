function create_inventory() {
  var form_name = 'IGFP-5-' + Utilities.getUuid();
  var form = FormApp.create(form_name);

  form
    .setTitle('Teste de personalidade')
    .setDescription(instructions())
    .setConfirmationMessage("Obrigado pela sua participação! Você receberá um email em breve com o resultado do seu teste de personalidade.")
    .setAllowResponseEdits(true)
    .setAcceptingResponses(true)
    .setProgressBar(true)
    .setShuffleQuestions(false);
    //.setLimitOneResponsePerUser(true);

  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    create_item(form, data[i][0]);
  }

  form
    .addTextItem()
    .setTitle('Nome completo')
    .setRequired(true);
  
  form
    .addTextItem()
    .setTitle('Email')
    .setRequired(true);
}

function create_item(form, text) {
  var item = form.addScaleItem();
  item.setTitle(text)
    .setBounds(1, 5)
    .setLabels("Discordo totalmente", "Concordo totalmente")
    .setRequired(true);
}

function instructions() {
  return "INSTRUÇÕES. A seguir encontram-se algumas características que podem ou não lhe dizer respeito. Por favor, escolha um dos números na escala abaixo que melhor expresse sua opinião em relação a você mesmo e anote no espaço ao lado de cada afirmação. Vale ressaltar que não existem respostas certas ou erradas. Utilize a seguinte escala de resposta:\n\n1. Discordo totalmente\n2. Discordo em parte\n3. Nem concordo nem discordo\n4. Concordo em parte\n5. Concordo totalmente\n\nEu me vejo como alguém que...";
}

/**
 * Extrai os enunciados de cada item do inventário
 */
function inventory() {
  return SpreadsheetApp
    .getActive()
    .getSheets()[0]
    .getDataRange()
    .getValues();
}
