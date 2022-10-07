import routes from './routes';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';

dotenv.config();
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
	secret: 'fgg65uj56jtrgjdifhq-546dshcx',
	store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING}),
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 1,
		httpOnly: true
	}
}));

app.use(routes); // Chama o arquivo de rotas

mongoose.connect(process.env.CONNECTION_STRING)
	.then(() => {
		app.listen(process.env.PORT);
		console.log(`Connected to MongoDB: http://localhost:${process.env.PORT}/`);
	})
	.catch(err => console.log(err)); // Se não conectar, logará o erro

// Onde o usúario terá inicialmente três etapas entre elas: Todo, doing e Finished
// O mesmo poderá adicionar cards e atualizar as etapas
