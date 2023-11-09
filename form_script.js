/**
 * 1. Create an Apps Script in the IGFP-5 inventory Google form with this code.
 * 2. Set DEFAULT_RECIPIENTS and SEND_FEEDBACK_TO_RESPONDENT as needed.
 * 3. Manually execute the function `createTrigger`.
 */
const INVENTORY_SPREADSHEET_ID = '1nMrDW7f8ufrLhnSH6uPEO_dMl79DN8GD0kZcOHu_yCg'

// Always send Big5 result to these (staff) emails
const DEFAULT_RECIPIENTS = ['email@dominio.com']

// Set to true so that respondents also receive result
// ATTENTION: the sender shall be the owner of this Apps Script
const SEND_FEEDBACK_TO_RESPONDENT = false

// Calculates the average of a given array of numbers
const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

/**
* Creates the trigger which emits the event on form submition.
*/
function createTrigger() {
  ScriptApp.newTrigger('onSubmit')
    .forForm(FormApp.getActiveForm())
    .onFormSubmit()
    .create();
}

/**
* On submition of a new IGFP-5 response, calculate traits and send message.
*
* @param {*} event
*/
function onSubmit(event) {
  responses = event.response.getItemResponses()
  scores = gatherScores(responses)

  var respondentName = responses[responses.length-2].getResponse();
  var respondent = {
    name: respondentName,
    firstName: respondentName.split(' ')[0],
    email: responses[responses.length-1].getResponse(),
    traits: calculateTraits(scores)
  }

  message = composeMessage()
  sendResult(message, respondent.email)
}

/**
* Gather IGFP-5 scores from responses.
*
* @param {*} responses
* @returns a dictionary from factors to list of scores. For instance:
* {'O': [5, 3, 2], 'E': [1, 1, 2], ...}
*/
function gatherScores(responses) {
  const inventoryMetadata = getInventoryMetadata()

  scores = {}
  factors = getFactors()
  for (var i = 0; i < factors.length; i++) {
    scores[factors[i]] = []
  }

  // Last 2 items are name and email
  n_items = responses.length
  for (var j = 0; j < n_items - 2; j++) {
    var itemResponse = responses[j];
    var itemTitle = itemResponse.getItem().getTitle()
    var itemMetadata = inventoryMetadata[itemTitle]

    score = parseInt(itemResponse.getResponse())
    if (itemMetadata.reverse) {
      score = 6 - score
    }

    scores[itemMetadata.factor].push(score)
  }

  return scores
}

/**
 * Calculate traits from scores.
 *
 * @param {*} scores
 * @returns a dictionary from factor to average score:
 * {'O': 3.33, 'E': 1.33, ...}
 */
function calculateTraits(scores) {
  var traits = {'O': 0, 'C': 0, 'E': 0, 'A': 0, 'N': 0}

  for (factor in scores) {
    score = average(scores[factor])
    if (isNaN(score)) score = 0
    traits[factor] = Math.round(score)
  }

  return traits;
}

 /**
  * Compose an email message from traits.
  *
  * @param {*} traits
  * @returns an HTML string
  */
function composeMessage() {
  return HtmlService
    .createTemplateFromFile('feedback_template.html')
    .evaluate()
    .getContent();
}

function sendResult(message, respondent_email) {
  recipients = DEFAULT_RECIPIENTS

  if (SEND_FEEDBACK_TO_RESPONDENT) {
    recipients.push(respondent_email)
  }

  for (var i = 0; i < recipients.length; i++) {
    MailApp.sendEmail({
      to: recipients[i],
      subject: 'Resultado do seu teste de personalidade',
      htmlBody: message
    })
  }
}

 /**
  * Constructs a dictionary from question title to its factor and reverse-scale attribute.
  * For instance:
  * { "É conversador, comunicativo.": { "factor": "E", "reverse": false },
  *   "Às vezes é frio e distante.": { "factor": "A", "reverse": true }
  * }
  */
 function getInventoryMetadata() {
  items = inventory()

  metadata = {}
  for (var i = 1; i < items.length; i++) {
    var question = items[i][0]

    metadata[question] = {
      'reverse': items[i][1],
      'factor': items[i][2]
    }
  }

  return metadata
 }

/**
 * Constructs the list ['O', 'C', 'E', 'A', 'N'], the Big5 factors,
 * from the inventory.
 */
function getFactors() {
  items = inventory()

  factors = []
  for (var i = 1; i < items.length; i++) {
    factors.push(items[i][2])
  }

  return [...new Set(factors)];
}

/**
 * Returns the inventory definition from Googlesheet named 'create_igfp-5_inventory'
 */
function inventory() {
  return SpreadsheetApp
    .openById(INVENTORY_SPREADSHEET_ID)
    .getSheets()[0]
    .getDataRange()
    .getValues();
}
