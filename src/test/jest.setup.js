const { MongoMemoryServer } = require('mongodb-memory-server')
const { Collection, Db, MongoClient } = require('mongodb')

let mongo
let mongoClient
let db

const testDbName = 'persona-store-test'

/**
 * 1.
 * Initial setup step to be run ONCE BEFORE ALL test cases
 */
beforeAll(async () => {
  /**
   * 1.1
   * Start in-memory MongoDB
   */
  mongo = new MongoMemoryServer({ dbName: testDbName })

  /**
   * 1.2
   * Set the MongoDB host and DB name as environment variables,
   * because the application expect it as ENV vars.
   * The values are being created by the in-memory MongoDB
   */
  await mongo.ensureInstance()
  process.env.MONGO_HOST = await mongo.getUri()
  process.env.MONGO_DB = testDbName

  /**
   * 1.3
   * Connect to our in-memory MongoDB, so we can do some initial setup/cleaning
   */
  mongoClient = await MongoClient.connect(process.env.MONGO_HOST)
  db = mongoClient.db(process.env.MONGO_DB)

  global.SERVER = require('../server')

  /**
   * 1.4
   * Create our 'persons' collection on the newly created MongoDB
   */
  // await db.createCollection(PERSON_COLLECTION);
})

/**
 * 2.
 * Step to be run before each test case
 */
beforeEach(async () => {
  /**
   * 2.1
   * Get all collection in the MongoDB and remove all elements from them.
   * We do this to have a clean state between each test case so we don't introduce
   * side effects inside the test cases, affecting other test cases
   */
  const collections = await db.collections()
  await Promise.all(collections.map((collection) => collection.deleteMany({})))
})

/**
 * 3.
 * Final "cleanup" step to be run after all the test cases finished
 */
afterAll(async () => {
  console.log('closing up')
  /**
   * 3.1
   * Close connection to our MongoDB
   * Stop our in-memory MongoDB
   */
  await mongoClient.close()
  await mongo.stop()

  // close server connection
  if (global.SERVER) {
    await global.SERVER.close()
  }
  console.log('finished cleanup')
})
