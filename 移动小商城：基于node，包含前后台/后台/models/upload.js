import mongoose from 'mongoose'

const Schema = mongoose.Schema({
	name     : String,
	path     : String,
	create_at: {
		type   : Date,
		default: Date.now(),
	},
})

export default mongoose.model('upload', Schema)