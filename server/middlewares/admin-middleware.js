const adminMiddleware = async (req, res, next) =>{
    try {
        //console.log(req.user);
        const adminRole = req.user.IsAdmin;
        if(!adminRole){
            return res.status(403).json({message: "Access denied. User is not an Admin."});
        }
        //res.status(200).json({msg : req.user.IsAdmin});
        next();
    } catch (error) {
        next(error)
    }
};
module.exports = adminMiddleware;