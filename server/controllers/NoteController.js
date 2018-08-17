const UsersModel = require('../models/User');
// const NpteModel = require('../models/Note');
const Note =  require('../models/Note');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var JWT_Verify = require('../middlewares/jwt');

function getAll(req,res){
    const author_id = JWT_Verify.getUser(req)._id;

    Note.find({author_id : author_id},null,{sort: {created_at: -1}},(err,response)=>{
        if(err) return res.status(404).json({'status': false, 'message': 'An Error Occured',payload:null});
        return res.status(200).json({'status': true, 'message': 'Success', payload: response});
    });
}

function create(req, res){
    const author_id = JWT_Verify.getUser(req)._id;
        (new Note({
            title : req.body.title,
            body : req.body.body,
            author_id : author_id
        })).save((err, object) => {
            if (err) return res.status(401).json({'status': false, 'message': 'An Error Occured',payload:null});
            return res.status(201).json({'status': true, 'message': 'Note Created Successfully', payload: object});
    });
}

function update(req, res){
    Note.findByIdAndUpdate(req.params.id,{ 
        title: req.body.title,
        body:req.body.body 
    },function(error, note) {
        if (error) return res.status(404).json({'status': false, 'message': 'An Error Occured'});
        return res.status(200).json({'status': true, 'message': 'Update Successful', payload: note})
    });
}

function remove(req,res){
    Note.findByIdAndRemove(req.params.id,(err,result) =>{
        if (err) return res.status(404).json({'status': false, 'message': 'An Error Occured'});
        return res.status(200).json({'status': true, 'message': 'Delete Successful'})
    })
}


module.exports = { getAll, create, update, remove }