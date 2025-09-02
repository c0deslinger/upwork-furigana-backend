const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const axios = require('axios');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Environment variables with fallbacks
const YAHOO_API_URL = process.env.YAHOO_API_URL || 'https://jlp.yahooapis.jp/FuriganaService/V2/furigana';
const YAHOO_API_KEY = process.env.YAHOO_API_KEY || 'Yahoo AppID: dj00aiZpPWc2Vk1NOFVsWmx5SCZzPWNvbnN1bWVyc2VjcmV0Jng9MGE-';

// Validate required environment variables
if (!YAHOO_API_KEY || YAHOO_API_KEY === 'Yahoo AppID: dj00aiZpPWc2Vk1NOFVsWmx5SCZzPWNvbnN1bWVyc2VjcmV0Jng9MGE-') {
  console.warn('⚠️  Warning: Using default Yahoo API key. Please set YAHOO_API_KEY environment variable.');
}

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Furigana Backend API'
  });
});

// Yahoo Furigana API bridge endpoint
app.post('/api/furigana', async (req, res) => {
  try {
    const { text, grade = 1 } = req.body;

    // Log incoming request
    console.log('📥 Incoming request from client:');
    console.log('   URL:', req.url);
    console.log('   Method:', req.method);
    console.log('   Headers:', JSON.stringify(req.headers, null, 2));
    console.log('   Body:', JSON.stringify(req.body, null, 2));

    // Validate input
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'Text parameter is required and must be a string'
      });
    }

    // Prepare request body for Yahoo API
    const requestBody = {
      id: "1234-1",
      jsonrpc: "2.0",
      method: "jlp.furiganaservice.furigana",
      params: {
        q: text,
        grade: grade
      }
    };

    console.log(`Processing furigana request for text: "${text}"`);

    // Log the curl command for debugging
    const curlCommand = `curl -X POST ${YAHOO_API_URL} \\
  -H "Content-Type: application/json" \\
  -H "User-Agent: ${YAHOO_API_KEY}" \\
  -d '${JSON.stringify(requestBody)}'`;
    console.log('🔍 Yahoo API Request (curl):');
    console.log(curlCommand);

    // Make request to Yahoo API
    const yahooResponse = await axios.post(
      YAHOO_API_URL,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': YAHOO_API_KEY,
        },
        timeout: 10000 // 10 second timeout
      }
    );

    console.log('✅ Yahoo API response received successfully');
    console.log('📥 Yahoo API Response Status:', yahooResponse.status);
    console.log('📥 Yahoo API Response Data:', JSON.stringify(yahooResponse.data, null, 2));

    // Return the Yahoo API response directly
    res.json(yahooResponse.data);

  } catch (error) {
    console.error('Error processing furigana request:', error.message);

    // Handle different types of errors
    if (error.response) {
      // Yahoo API returned an error response
      console.error('Yahoo API error response:', error.response.data);
      return res.status(error.response.status).json({
        error: 'Yahoo API Error',
        message: error.response.data,
        status: error.response.status
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received from Yahoo API');
      return res.status(503).json({
        error: 'Service Unavailable',
        message: 'Unable to reach Yahoo API',
        details: 'Request timeout or network error'
      });
    } else {
      // Something else happened
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred',
        details: error.message
      });
    }
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Furigana Backend API server running on port ${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
  console.log(`🎯 Furigana endpoint: http://localhost:${PORT}/api/furigana`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔑 Yahoo API URL: ${YAHOO_API_URL}`);
  console.log(`🔑 Yahoo API Key: ${YAHOO_API_KEY ? 'Set' : 'NOT SET'}`);
  if (YAHOO_API_KEY) {
    console.log(`🔑 Yahoo API Key Length: ${YAHOO_API_KEY.length}`);
    console.log(`🔑 Yahoo API Key Preview: ${YAHOO_API_KEY.substring(0, 20)}...`);
  }
});

module.exports = app;
