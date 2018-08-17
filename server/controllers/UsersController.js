const UsersModel = require('../models/User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

function register(req, res){
    var userCreationObject = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    };
        (new UsersModel(userCreationObject)).save((err, object) => {
            if (err) return res.status(401).json({'status': false, 'message': 'An Error Occured', payload: err});
            return res.status(201).json({'status': true, 'message': 'Account Created Successfully', payload: object});
    });
}

function login (req, res){
    UsersModel.findOne({ email: req.body.email },function(error, User) {
            if (error) return res.json({'status': false, 'message': 'An Error Occured'});
            if(!User) return res.json({'status':false,'message':'Email Not Registered In Our Databases'});

            if (bcrypt.compareSync(req.body.password, User.password) == false) return  res.json({'status': false, 'message': 'Incorrect login credentials, please try again.'})
            User.password = "";
            var token = jwt.sign(User.toJSON(), process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 60
            });

            var payload = {};
            payload.token = token;
            payload.user_details = User;
            return res.status(200).json({'status': true, 'message': 'Login Successful', payload: payload})
        });

    }


module.exports = { register, login }