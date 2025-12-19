const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Import your fixed User model
const User = require('../src/models/User');

async function testUserSave() {
  try {
    // Test 1: Create new user
    console.log('Test 1: Creating new user...');
    const newUser = new User({
      name: 'Test User',
      email: 'test' + Date.now() + 'info.erdtec@gmail.com',
      password: 'password',
      role: 'teacher'
    });
    
    await newUser.save();
    console.log('User created successfully');
    
    // Test 2: Update user without changing password
    console.log('\nTest 2: Updating user name (no password change)...');
    newUser.name = 'Updated Name';
    await newUser.save();
    console.log('User updated successfully');
    
    // Test 3: Update password
    console.log('\nTest 3: Updating user password...');
    newUser.password = 'newpassword123';
    await newUser.save();
    console.log('Password updated successfully');
    
    // Test 4: Verify password match
    console.log('\nTest 4: Verifying password match...');
    const isMatch = await newUser.matchPassword('newpassword123');
    console.log('Password match result:', isMatch ? 'Correct' : 'Incorrect');
    
    mongoose.disconnect();
    console.log('\nAll tests passed!');
    
  } catch (error) {
    console.error('Error:', error.message);
    mongoose.disconnect();
  }
}

testUserSave();