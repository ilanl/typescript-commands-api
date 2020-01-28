import * as express from "express";
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import { ServerSettings } from './settings';
import { Middlewares } from "./middlewares/Middlewares"

const app = express();

main()

async function main() {
  // await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true , useUnifiedTopology: true })
  app.set('port', ServerSettings.port);
  app.set('env', 'development');
  Middlewares.registerModules(app);
  app.use(express.static('public'));
}

export default app;