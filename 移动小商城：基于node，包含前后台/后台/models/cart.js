import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	goods: {
		type: ObjectId, 
		ref : 'goods',
	},
	total: {
		type   : Number,
		default: 1,
	},
	amount: Number,
	totalAmount: Number,
	user    : {
		type: ObjectId, 
		ref : 'user',
	},
	create_at: {
		type   : Date,
		default: Date.now(),
	},
	update_at: Date,
})

export default mongoose.model('cart', Schema)