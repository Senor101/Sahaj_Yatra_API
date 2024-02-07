import { Request, Response } from 'express';
import { Router } from 'express';
import os from 'os';

//import routers here
import authRouter from './routes/auth.router';
import transactionRouter from './routes/transaction.router';
import adminRouter from './routes/admin.router';
import userRouter from './routes/user.router';
import geoLocationRouter from './routes/geolocation.router';
import busRouter from './routes/bus.router';

const router = Router();

router.get('/', (req: Request, res: Response): Response => {
    return res.status(200).send("<h1 align='center'>Welcome to Sahaj Yatra API</h1>");
});

router.get('/health', (req: Request, res: Response): Response => {
    // TODO SET THRESHOLD FOR UPTIME, LOAD AVERAGE, CPU USAGE,MEMORY USAGE
    let healthCheckStats = {
        status: 'OK',
        message: 'Server running under normal condition',
        uptime: process.uptime(),
        loadAverage: os.loadavg(),
        hostname: os.hostname(),
        cpuUsage: process.cpuUsage()
    };
    return res.status(200).json(healthCheckStats);
});

// use routers here
router.use('/user', userRouter);

router.use('/auth', authRouter);

router.use('/transaction', transactionRouter);

router.use('/admin', adminRouter);

router.use('/location', geoLocationRouter);

router.use('/bus', busRouter);

export default router;
