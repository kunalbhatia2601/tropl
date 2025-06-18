import { MongoClient } from 'mongodb';

// Raw MongoDB client for operations that don't require transactions
let mongoClient: MongoClient | null = null;

export async function getMongoClient() {
  if (!mongoClient) {
    mongoClient = new MongoClient(process.env.DATABASE_URL!);
    await mongoClient.connect();
  }
  return mongoClient;
}

export async function createClientRaw(clientData: any) {
  const client = await getMongoClient();
  const db = client.db('tropl'); // Adjust database name as needed
  const collection = db.collection('clients');
  
  // Add default fields
  const document = {
    ...clientData,
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const result = await collection.insertOne(document);
  return { id: result.insertedId.toString(), ...document };
}

export async function findClientsRaw(query: any = {}, options: any = {}) {
  const client = await getMongoClient();
  const db = client.db('tropl');
  const collection = db.collection('clients');
  
  const { skip = 0, limit = 10, sort = { name: 1 } } = options;
  
  const [clients, total] = await Promise.all([
    collection.find(query).skip(skip).limit(limit).sort(sort).toArray(),
    collection.countDocuments(query),
  ]);
  
  return { clients, total };
}

export async function findClientByEmailRaw(email: string) {
  const client = await getMongoClient();
  const db = client.db('tropl');
  const collection = db.collection('clients');
  
  return await collection.findOne({ email });
}
