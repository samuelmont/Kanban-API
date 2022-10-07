import validator from 'validator';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const LoginSchema = new mongoose.Schema({
	email: {type: String, required: true},
	password: {type: String, required: true},
});

const LoginModel = mongoose.model('Login', LoginSchema);

interface LoginType {
  email: string,
  password: string,
}

interface UserType {
  _id?: object,
  email?: string,
  password?: string,
  __v?: number
}

class Login {
	obj: LoginType;
	errors: string[];
	user: null | UserType;
	constructor(obj: LoginType) {
		this.obj = obj;
		this.errors = [];
		this.user = {};
	}

	async register() {
		this.valida();
		if(this.errors.length > 0) return;
		await this.userExists();
		if(this.errors.length > 0) return;
		bcrypt.hash(this.obj.password, process.env.SALT, async (err, hash) => {
			this.obj['password'] = hash;
			this.user = await LoginModel.create(this.obj);
		});
	}

	async login() {
		this.valida();
		if(this.errors.length > 0) return;

		this.user = await LoginModel.findOne({ email: this.obj.email });

		if(!this.user) {
			this.errors.push('User not exists');
			return;
		}

		if(this.errors.length > 0) return;
		if(this.user.password === undefined) return;

		if(!bcrypt.compareSync(this.obj.password, this.user.password)) {
			this.errors.push('Wrong password!');
			this.user = null;
			return;
		}
	}

	async userExists() {
		this.user = await LoginModel.findOne({ email: this.obj.email });
		if(this.user) {
			this.errors.push('User already exists');
			return ;
		}
	}

	valida() {
		if(!validator.isEmail(this.obj.email)){
			this.errors.push('Invalid E-mail');
		}
		if(this.obj.password.length < 3 || this.obj.password.length > 50) {
			this.errors.push('Invalid Password');
		}
	}

	// Adicionar nome de usuário na criação de conta
}

export default Login;
