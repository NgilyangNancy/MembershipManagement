const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
  try {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    const conn = await mongoose.connect(uri);
    console.log(`🚀 Virtual MongoDB Connected Locally: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Virtual Database Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
