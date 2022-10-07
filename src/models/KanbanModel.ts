import mongoose from 'mongoose';

const KanbanSchema = new mongoose.Schema({
	id_owner: {type: String, required: true},
	users_id: {type: Object, required: false},
	frame: {type: Object, required: true}
});

const KanbanModel = mongoose.model('Kanban', KanbanSchema);

interface dataType {
  id_kanban?: string,
  id_owner?: string,
  users_id?: object,
  kanbanName?: string,
  topics?: object,
  oldTopic?: string,
}
interface frameType {
  __id?: string,
  id_owner?: string,
  frame?: object,
  users_id?: string[],
  __v?: number,
}

class Kanban {
	data: dataType;
	errors: Array<string | NativeError>;
	frame: void | null | frameType;
	constructor(obj: dataType){
		this.data = obj;
		this.errors = [];
		this.frame = {};
	}

	// Cria um frame novo
	async createNewFrame() {
		this.frame = await KanbanModel.create({id_owner: this.data.id_owner, kanbanName: this.data.kanbanName, frame: this.data.topics}, (err) => {
			if(err){
				this.errors.push(err);
			}
		});
	}

	// Cria novos topicos
	async updateTopics() {
		this.frame = await KanbanModel.findOneAndUpdate({id: this.data.id_kanban, id_owner: this.data.id_owner}, {frame: this.data.topics}, (err: string | NativeError) => {
			if(err){
				this.errors.push(err);
			}
		});
		console.log(this.frame);
	}

	// Apaga topicos
	// Edita topicos

	// Dono do kanban tem acesso á apagar, editar/adicionar topicos e card. Tambem poderá apagar o kanban
	// Dono só pode ser adicionar enviando um convite para o usuário
	// Usuário só pode sair e alterar o card designado á ele
	// Quando o usuário sair e ou atualizar o card o dono será notificado (notificação que poderá ser apagada)

	// **Ao final pensar sobre encriptação**
}

export default Kanban;
