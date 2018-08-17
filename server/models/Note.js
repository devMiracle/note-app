var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    
    title: {
        type: String, 
    },
    body: {
        type: String, 
    },
    author_id: {
        type: Schema.ObjectId,
        ref: 'Users',
        required: true
    }
},{
    collection: 'notes',
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    }
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note