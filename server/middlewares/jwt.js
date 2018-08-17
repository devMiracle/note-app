var jwt = require('jsonwebtoken');

var JWT = {};

JWT.verifyToken = function(req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if (!token) {
        return res.status(403).json({ status: false, message: 'No token provided', payload: null});
    }
    
    jwt.verify(token, process.env.JWT_SECRET, verifyCallBack);

	function verifyCallBack(error, decoded) {
		
		if (error) {
			return res.status(401).json({status:false, message: error.message});
		}
		res.decoded = decoded;
		// return res.decoded;
		// if(res.decoded._id != req.body.author_id) return res.status(404).json({status:false,message:"Invalid User"})

		next();
	}
};

JWT.getUser = function(req){
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	return decoded;
}

module.exports = JWT;
