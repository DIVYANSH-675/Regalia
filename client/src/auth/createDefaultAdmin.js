// createDefaultAdmin.js

const User = require('./models/User');

const createDefaultAdmin = async () => {
  try {
    // Check if admin user already exists
    const adminExists = await User.exists({ role: 'admin' });
    if (!adminExists) {
      // Create the default admin user
      const admin = new User({
        email: 'admin@example.com',
        password: 'adminpassword',
        role: 'admin',
      });
      await admin.save();
      console.log('Default admin user created successfully.');
    } else {
      console.log('Default admin user already exists.');
    }
  } catch (error) {
    console.error('Error creating default admin user:', error);
  }
};

createDefaultAdmin();
