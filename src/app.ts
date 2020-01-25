import * as express from "express";
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import { ServerSettings } from './settings';
import { contactRoutes } from './routes/contactRoutes';
import { helloRoutes } from './routes/helloRoutes';

const app = express();
app.set('port', ServerSettings.port);
app.set('env', 'development');

db()

async function db() {
  await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true , useUnifiedTopology: true })
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// print all req, resp
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  if (Object.keys(req.body).length > 0) {
    console.log(req.body)
  }
  next()
})

// serving static files
app.use(express.static('public'));

contactRoutes(app);
helloRoutes(app);

export default app;