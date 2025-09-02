const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testHealthCheck() {
  try {
    console.log('🔍 Testing health check...');
    const response = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check passed:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
}

async function testFuriganaAPI() {
  try {
    console.log('\n🔍 Testing furigana API...');
    
    const testData = {
      text: 'こんにちは',
      grade: 1
    };
    
    console.log('📤 Sending request with data:', testData);
    
    const response = await axios.post(`${BASE_URL}/api/furigana`, testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Furigana API test passed!');
    console.log('📥 Response:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.error('❌ Furigana API test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    return false;
  }
}

async function testInvalidInput() {
  try {
    console.log('\n🔍 Testing invalid input handling...');
    
    const invalidData = {
      text: '', // Empty text
      grade: 1
    };
    
    const response = await axios.post(`${BASE_URL}/api/furigana`, invalidData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('❌ Should have failed with empty text');
    return false;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log('✅ Invalid input handling works correctly');
      console.log('Response:', error.response.data);
      return true;
    } else {
      console.error('❌ Unexpected error:', error.message);
      return false;
    }
  }
}

async function runTests() {
  console.log('🚀 Starting backend tests...\n');
  
  const healthCheckPassed = await testHealthCheck();
  const furiganaAPIPassed = await testFuriganaAPI();
  const invalidInputPassed = await testInvalidInput();
  
  console.log('\n📊 Test Results:');
  console.log(`Health Check: ${healthCheckPassed ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Furigana API: ${furiganaAPIPassed ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Invalid Input: ${invalidInputPassed ? '✅ PASS' : '❌ FAIL'}`);
  
  const allPassed = healthCheckPassed && furiganaAPIPassed && invalidInputPassed;
  console.log(`\n${allPassed ? '🎉 All tests passed!' : '💥 Some tests failed!'}`);
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testHealthCheck,
  testFuriganaAPI,
  testInvalidInput,
  runTests
};
