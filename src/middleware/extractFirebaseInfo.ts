import { firebaseAdmin } from 'firebase-admin';
import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';

const extractFireBaseInfo = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Validating firebase token...');

    let token = req.headers.authorization?.split(' ')[1];

    if (token)
    {
        firebaseAdmin
            .auth()
            .verifyIdToken(token)
            .then(result => {
                if (result)
                {
                    res.locals.firebase = result;
                    res.locals.fire_token = token;
                }
                else
                {
                    logging.warn('Token invalid')

                    return res.status(401).json({
                        message: 'unauthorized'
                    });
                }

            })
            .catch(error => {
                logging.error(error);

                return res.status(401).json({
                    error,
                    message: 'unauthorized'
                });
            });
    }
    else
    {
        return res.status(401).json({
            message: 'unauthorized'
        });
    }
}

export default extractFireBaseInfo