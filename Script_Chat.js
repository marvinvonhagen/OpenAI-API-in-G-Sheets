// Replace YOUR_API_KEY with your actual API key
var API_KEY = 'YOUR_API_KEY';

/**
 * Returns the Chat response from the OpenAI API (e.g., gpt-3.5-turbo or gpt-4) for the given conversation.
 *
 * @param {Array} conversation An array of message objects for the conversation so far.
 * @param {number} [max_tokens = 64] The maximum number of tokens to generate in the response.
 * @return {string} The response from the GPT-3 API.
 *
 * Full credit to ChatGPT that created this script on my behalf ;-)
 */
function ChatGPT(systemPrompt, newUserPrompt, length, useGPT4, chatHistory = []) {
  if (!chatHistory) {
    var chatHistory = [
      { 'role': 'user', 'content': 'Who won the superbowl in 2020?' },
      { 'role': 'assistant', 'content': 'The Kansas City Chiefs won the Super Bowl in 2020.' }
    ];
  }
  // Set up the API URL and payload
  var API_URL = 'https://api.openai.com/v1/chat/completions';

  // Create the messages array based on the chatHistory and newUserPrompt
  var messages = chatHistory;

  // Include the system message
  messages.unshift({
    'role': 'system',
    'content': systemPrompt
  });

  // Include the new user message
  messages.push({
    'role': 'user',
    'content': newUserPrompt
  });

  // Choose the model based on useGPT4
  var model = useGPT4 ? 'gpt-4' : 'gpt-3.5-turbo';

  var payload = {
    'model': model,
    'messages': messages,
    'max_tokens': length
  };

  // Make the API request
  var response = UrlFetchApp.fetch(API_URL, {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_KEY
    },
    'payload': JSON.stringify(payload)
  });

  // Parse the response and return the assistant's message
  var responseText = response.getContentText();
  var responseJson = JSON.parse(responseText);
  return responseJson['choices'][0]['message']['content'];
}

