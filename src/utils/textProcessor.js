const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// Enhanced stopwords list
const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
  'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were',
  'will', 'with', 'about', 'after', 'all', 'also', 'am', 'can', 'could', 'into',
  'may', 'most', 'other', 'our', 'some', 'such', 'than', 'then', 'these'
]);

function preprocessText(text) {
  if (!text || typeof text !== 'string') return '';

  // Convert to lowercase and remove special characters
  const cleanText = text.toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Tokenize
  const tokens = tokenizer.tokenize(cleanText);

  // Remove stopwords and apply stemming
  const processedTokens = tokens
    .filter(token => !STOPWORDS.has(token))
    .map(token => stemmer.stem(token));

  return processedTokens;
}

function chunkText(text, maxChunkSize = 500) {
  if (!text || typeof text !== 'string') return [];

  // Split into sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length <= maxChunkSize) {
      currentChunk += sentence + ' ';
    } else {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence + ' ';
    }
  }

  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
}

function findMatchedKeywords(docTokens, queryTokens) {
  const matches = new Set();
  for (const token of queryTokens) {
    if (docTokens.includes(token)) {
      matches.add(token);
    }
  }
  return Array.from(matches);
}

module.exports = {
  preprocessText,
  chunkText,
  findMatchedKeywords
};