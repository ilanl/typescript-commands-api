import { 
  sayHello
} from '../controllers/helloController';

export const helloRoutes = (app) => {
  app.route('/sayHello')
  .get(sayHello);
};
