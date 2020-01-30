// test-setup.js 
import * as mongoose from 'mongoose';

mongoose.set('useCreateIndex', true)

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany({})
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    try {
      await collection.drop()
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === 'ns not found') return
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes('a background operation is currently running')) return
      console.log(error.message)
    }
  }
}

export const setupDB = (connectionString) => {
  return {
    // Connect to Mongoose
    beforeAll: async () => {
      console.log('Before Each');
      const url = connectionString
      await mongoose.connect(url, { useNewUrlParser: true })
    },
    // Cleans up database between each test
    afterEach: async () => {
      console.log('After Each');
      // await removeAllCollections()
    },
    // Disconnect Mongoose
    afterAll: async () => {
      console.log('After All');
      // await dropAllCollections();
      // await mongoose.connection.close();
    }
  }
}