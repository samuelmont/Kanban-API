import { RequestHandler } from 'express';

export const isLogged: RequestHandler = (req, res, next) => {
	if(!req.session.user) {
		return res.status(401).json({error: 'You need to be logged'});
	}
	next();
};
