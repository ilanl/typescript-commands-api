import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import CommandController from './devices/controllers/CommandController';

export default class App {
  public app: express.Application;
  public port: number;
  private _controllers = [new CommandController()];

  constructor(port) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeControllers(this._controllers);
  }
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    // Add Middlewares
  }
  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
  public listen() {
    this.app.listen(this.port, () => {
      // tslint:disable-next-line: no-console
      console.log(`App listening on the port ${this.port}`);
    });
  }
}