import { RequestHandler } from 'express';
import Kanban from '../models/KanbanModel';

// Cria um novo kanban
export const create: RequestHandler = async(req, res) => {
	try{
		if(!req.session.user) {
			return res.status(401).json({ message: 'You need to be logged' });
		}

		const item = new Kanban({
			id_owner: `${req.session.user._id}`,
			kanbanName: req.body.kanbanName,
			topics: {
				toDo: [{card: 'add new things', color: '0000FF'}],
				doing: [{card: 'add new things', color: '00FF00'}],
				finished: [{card: 'add new things', color: 'FF0000'}]},
		});
		await item.createNewFrame();

		return res.status(200).json(item.frame);
	} catch(e){
		console.log(e);
	}
};

// Atualiza topicos
export const updateTopic: RequestHandler = async(req, res) => {
	try{
		if(!req.session.user) {
			return res.status(401).json({ message: 'You need to be logged' });
		}

		const item = new Kanban({
			id_kanban: '63403dd93a1bab5f1070af2e',
			id_owner: `${req.session.user._id}`,
			topics: req.body.topics});
		await item.updateTopics();

		return res.status(200).json(item.frame);
	} catch (e){
		console.log(e);
	}
};
