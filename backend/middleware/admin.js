
const admin = async (req, res, next) => {
  
    try {
        let user = req.user;

        if(user.role === 'User')
        {
            res.status(400).json({
                message : 'user is not admin.'                    
            })
        
        }
        next();

    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            success: false,
            error: true,
           
        });
    }
};

export default admin;
