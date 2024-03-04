// tests/user-crud-testing.js

const { createUser, getUserByEmail, updateUser, deleteUser } = require('../handlers/userHandler');

const runTests = async () => {
  try {
    console.log('Creating user...');
    const user = await createUser('test@example.com', 'password123');
    console.log('User created:', user);

    console.log('Getting user...');
    const foundUser = await getUserByEmail('test@example.com');
    console.log('User found:', foundUser);

    console.log('Updating user...');
    const updatedUser = await updateUser('test@example.com', 'newPassword123');
    console.log('User updated:', updatedUser);

    console.log('Deleting user...');
    await deleteUser('test@example.com');
    console.log('User deleted');
  } catch (error) {
    console.error('Test failed:', error);
  }
};

module.exports = runTests;