import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	totalAmount: Number,
	payAmount: Number,
	payTime  : Date,
	status   : {
		type   : String,
		default: 'submitted',
	},
	recipientName: String,
	recipientGender: String,
	recipientTel: String,
	recipientAddress: String,
	items    : Array,
	user     : {
		type: ObjectId, 
		ref : 'user',
	},
	create_at: {
		type   : Date,
		default: Date.now(),
	},
	update_at: Date,
})

export default mongoose.model('order', Schema)