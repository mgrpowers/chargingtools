const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const dotenv = require('dotenv');
const cors = require("cors");
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

dotenv.config();

var schema = buildSchema(`
  type Query {
    
    stations: StationStatus
  }

  type StationStatus {
    numberOfStations: Int
  }

  type StationCreation {
    stationId: String
    message: String
  }

  type Mutation {
    setMessage(message: String): String
    reportStation(stationId: String!): StationCreation
  }
`);

var root = {
  stations: () => {
    return {
      numberOfStations: 3
    }
  },
  setMessage: ({message}) => {
    fakeDatabase.message = message;
    return message;
  },
  
  reportStation: ({stationId}: {stationId: string}) => {
    console.log("stationId", stationId)
    return {
      stationId: stationId,
      message: "Thank you!"
    }
  }
};


const app = express();
const port = process.env.PORT;

app.use(cors());

app.use('/', indexRouter);
app.use('/api/v1', apiRouter);

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});