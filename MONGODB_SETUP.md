# MongoDB Replica Set Setup Guide

## Option 1: Using MongoDB Compass or Atlas (Easiest)
If you're using MongoDB Atlas (cloud), it's already configured as a replica set.

## Option 2: Local MongoDB Replica Set Setup

### Step 1: Stop your current MongoDB service
```bash
# On Windows
net stop MongoDB

# On macOS/Linux
sudo systemctl stop mongod
```

### Step 2: Create a MongoDB configuration file
Create a file called `mongod.conf`:

```yaml
storage:
  dbPath: C:\data\db  # Adjust path as needed
net:
  port: 27017
  bindIp: 127.0.0.1
replication:
  replSetName: "rs0"
```

### Step 3: Start MongoDB with replica set
```bash
# Start MongoDB with the config file
mongod --config mongod.conf

# Or directly with command line
mongod --replSet rs0 --dbpath C:\data\db
```

### Step 4: Initialize the replica set
Open a new terminal and connect to MongoDB:

```bash
mongosh
```

Then run:
```javascript
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27017" }
  ]
})
```

### Step 5: Verify the replica set
```javascript
rs.status()
```

### Step 6: Update your connection string
Update your `.env` file:
```
DATABASE_URL="mongodb://localhost:27017/tropl?replicaSet=rs0"
```

## Option 3: Using Docker (Alternative)
If you prefer Docker:

```bash
# Pull MongoDB image
docker pull mongo:6

# Run MongoDB as replica set
docker run --name mongodb-replica -d -p 27017:27017 mongo:6 --replSet rs0

# Initialize replica set
docker exec -it mongodb-replica mongosh --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]})"
```

After setting up the replica set, your Prisma operations will work correctly with transactions.
