import { RequestHandler } from 'express';
import Login from '../models/LoginModel';

export const index: RequestHandler = (req, res) => {
	try{
		if(req.session.user) {
			return res.status(200).json({ message: 'You are logged'});
		}

		return res.json({ message: 'You need to login or register'});
	} catch(e) {
		console.log(e);
	}
};

export const register: RequestHandler = async (req, res) => {
	try{
		const login = new Login({ email: req.body.email, password: req.body.password });
		await login.register();

		if(login.errors.length > 0) {
			return res.status(400).json({ error: login.errors });
		}

		return res.status(200).json({ message: 'Account created' });
	} catch(e) {
		console.log(e);
	}
};

export const login: RequestHandler = async (req, res) => {
	try{
		const login = new Login({ email: req.body.email, password: req.body.password });
		await login.login();

		if(login.errors.length > 0) {
			req.session.save();
			return res.status(400).json({ error: login.errors });
		}

		req.session.user = login.user;
		req.session.save();
		return res.status(200).json({ message: 'You are logged' });
	} catch(e) {
		console.log(e);
	}
};

export const logout: RequestHandler = (req, res) => {
	try{
		if(req.session.user) {
			req.session.destroy(() => {return;});
			return res.json({ message: 'You are unlogged' });
		}

		return res.json({ message: 'You are already unlogged'});
	} catch (e) {
		console.log(e);
	}
};
