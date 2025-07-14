import { NextFunction, Request, Response } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
    // const SLOW_REQUEST_THRESHOLD = 2000; // in milliseconds (2 seconds)

    console.log(`Api hit😒 [${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();


    // const startTime = Date.now();  // Track the start time of the request

    // res.on('finish', () => {
    //     const duration = Date.now() - startTime; // Calculate the time taken to process the request

    //     // 1. Log errors (4xx, 5xx responses)
    //     if (res.statusCode >= 400) {
    //         console.log(`Error [${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode}`);
    //     }

    //     // 2. Log slow requests (if the request takes longer than the threshold)
    //     if (duration > SLOW_REQUEST_THRESHOLD) {
    //         console.log(`Slow request [${new Date().toISOString()}] ${req.method} ${req.url} took ${duration}ms`);
    //     }

    //     // 3. Log specific API calls (e.g., you can log only certain paths or methods)
    //     if (req.url === '/specific-api') {
    //         console.log(`Specific API hit [${new Date().toISOString()}] ${req.method} ${req.url} took ${duration}ms`);
    //     }
    // });
}