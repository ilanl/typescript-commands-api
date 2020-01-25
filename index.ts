import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import { Messenger } from './src/controllers/createMessage';
import { Settings } from './src/settings';

const app = express();

const dataConnection = (user: string, pass: string) : string => {
  return `mongodb+srv://${user}:${pass}@cluster-qfnvn.mongodb.net/test?retryWrites=true&w=majority`
}

let messages = new Messenger(Settings.port)

mongoose
  .connect(dataConnection(Settings.user, Settings.pass), { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => { console.log('db connected') })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

function nameCreator<T>(name: T): T {
  return name
}
let myName = nameCreator<string>('Ilan')
let myNumber = nameCreator<number>(5)

interface Warriors {
  weapon: string;
  skills: number;
}

interface Warriors {
  name: string;
}

let ninja : Warriors = { weapon: 'knife', skills: 1, name: 'Ilan Levy' }

console.log(myName, myNumber)

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(ninja)
);

app.listen(Settings.port, () =>
    console.log(messages.messagePrint())
);