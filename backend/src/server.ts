import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

//app.use((req, res, next) => {
//    res.header("Access-Control-Allow-Origin", "https://menderson.site"); 
    app.use(cors());
//    next();
//}
 //   );
app.use(express.json());
app.use(routes);
app.use(errors());
app.listen(process.env.PORT || 3333);