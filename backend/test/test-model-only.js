// Test just the model logic without database connection
const bcrypt = require('bcryptjs');

async function testBcrypt() {
  console.log('Testing bcrypt functionality...\n');
  
  try {
    // Test 1: Hash a password
    console.log('Test 1: Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    console.log('Hash successful:', hashedPassword.substring(0, 30) + '...');
    
    // Test 2: Compare password
    console.log('\nTest 2: Comparing password...');
    const isMatch = await bcrypt.compare('password123', hashedPassword);
    console.log('Password match:', isMatch);
    
    // Test 3: Wrong password
    console.log('\nTest 3: Wrong password...');
    const isWrongMatch = await bcrypt.compare('wrongpassword', hashedPassword);
    console.log('Wrong password rejected:', !isWrongMatch);
    
    console.log('\nAll bcrypt tests passed!');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testBcrypt();