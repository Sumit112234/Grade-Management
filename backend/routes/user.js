// import { Router } from 'express';
// import { forgotPassword, loginUser, logoutUser,getUserDetail,getAddress,addAddress,getAuthToken, refreshToken, resetPassword, saveUser, updateUserDetails,  verifyForgotPassword, verifyUser, verifyToken, getProfile ,deleteAddress,updateAddress } from '../UtilitiFunctions/userHandler.js';
// import auth from '../middleware/auth.js';
// import {upload} from '../middleware/multer.js';

// const userRouter = Router();


// userRouter.post('/register', saveUser);
// userRouter.post('/login', loginUser);
// userRouter.get('/logout', auth,logoutUser);
// // userRouter.put('/upload-avtar', auth,upload.single('avatar'), );
// userRouter.put('/update-details', auth, upload.single('avatar'),updateUserDetails);
// userRouter.put('/forgotPass', forgotPassword);
// userRouter.put('/verify-otp', verifyForgotPassword);
// userRouter.put('/reset-pass', resetPassword);
// userRouter.put('/verify-user', verifyUser);
// userRouter.put('/tokenRefresh', refreshToken);
// userRouter.get('/getToken', getAuthToken);
// userRouter.get('/verifyToken', verifyToken);
// userRouter.get('/getUser',auth, getProfile);
// userRouter.get('/getUserDetail/:_id', getUserDetail);


// export default userRouter;