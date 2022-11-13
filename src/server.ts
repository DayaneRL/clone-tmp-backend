import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/routes';
import cors from 'cors';

const router: Express = express();

router.use(morgan('dev'));
router.use(express.urlencoded({ extended: false }));
const corsOptions ={
    origin:'http://localhost:3006', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
router.use(cors(corsOptions));
router.use(express.json());
router.use('/', routes);

router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));