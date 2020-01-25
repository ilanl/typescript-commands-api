import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';

const app = express();

const PORT = 3000;
const MONGODB = 'mongodb+srv://admin:wdCRe6NPmRBGzrZp@cluster-qfnvn.mongodb.net/test?retryWrites=true&w=majority'

mongoose
  .connect(MONGODB, { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => { console.log('db okay') })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);