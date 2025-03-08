// // import User from '../models/user.js';
// import bcryptjs from 'bcryptjs';
// import sendEmail from './resendEmails.js';
// import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
// import generateAccessToken from '../utils/generateAccessToken.js';
// import generateRefreshToken from '../utils/generateRefreshToken.js';
// import uploadImageCloudinary from '../utils/uploadImageCloudinary.js';
// import jwt from 'jsonwebtoken';
// import generateOpt from '../utils/generateOpt.js';
// import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js';
// import User from '../models/user.js';
// import mongoose from 'mongoose';
// import Address from '../models/address.js';
// import user from '../models/user.js';



// const generateTokens = (userId) => {
// 	const accessToken = jwt.sign({ userId }, process.env.SECRET_KEY_ACCESS_TOKEN, {
// 		expiresIn: "100m",
// 	});

// 	const refreshToken = jwt.sign({ userId }, process.env.SECRET_KEY_REFRESH_TOKEN, {
// 		expiresIn: "7d",
// 	});

// 	return { accessToken, refreshToken };
// };
// const setCookies = (res, accessToken, refreshToken) => {
    
  
// 	res.cookie("accessToken", accessToken, {
//         httpOnly : true,
//         secure : true,
//         sameSite : "None",
// 		maxAge: 15 * 60 * 10000, // 15 minutes
// 	});
// 	res.cookie("refreshToken", refreshToken, {
//         httpOnly : true,
//         secure : true,
//         sameSite : "None",
// 		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
// 	});
// 	// res.cookie("accessToken", accessToken, {
// 	// 	httpOnly: true, // prevent XSS attacks, cross site scripting attack
// 	// 	secure: process.env.NODE_ENV === "production",
// 	// 	sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
// 	// 	maxAge: 15 * 60 * 1000, // 15 minutes
// 	// });
// 	// res.cookie("refreshToken", refreshToken, {
// 	// 	httpOnly: true, // prevent XSS attacks, cross site scripting attack
// 	// 	secure: process.env.NODE_ENV === "production",
// 	// 	sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
// 	// 	maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
// 	// });
// };

// export async function getAuthToken(req,res){
//     const token = req?.cookies?.authToken || req?.headers?.authorization?.split(" ")[1];
        
    
//     if (!token) {
//         return res.status(400).json({
//             message: "No token found!",
//             success: false,
//             error: true,
//             data : req?.cookies
//         });
//     }
//     return res.status(200).json({
//         message: "token found!",
//         success: true,
//         error: false,
//         token
//     });
// }


// export async function saveUser(req,res){

//     try{

        
//         const {name , email , password} = req.body;

        
//         if(!name || !email || !password)
//         {
//            return  res.status(500).json({
//                 message: "name or email or password is not coming.",
//                 status : false,
//                 error : true,
//                 data : {name ,email,password}
//             })
//         }

//         const user = await User.findOne({email});

//         if(user)
//         {
//             return res.status(500).json({
//                 message: "User already exists",
//                 status : false,
//                 error : true
//             })
//         }

//         let salt = await bcryptjs.genSalt(13);
//         let hashPass = await bcryptjs.hash(password,salt);
    

//         let dataModel = {
//             name,
//             email : email.toLowerCase(),
//             password : hashPass,
//             last_login_date : new Date()

//         }
//         const newUser = await User.create(dataModel);
//         console.log(newUser);
//         const { accessToken, refreshToken } = generateTokens(newUser._id);

//         setCookies(res, accessToken, refreshToken);
      
//         // let data = new User(dataModel);
//         // await data.save();

//         let verifyEmailUrl = ".../verify?token=uniqueToken";
//         let verify_email = sendEmail({
//             sendTo : email,
//             subject : "Verify Email",
//             html : verifyEmailTemplate({
//                 name,
//                 url : verifyEmailUrl
//             })
//         })

//         return res.status(200).json({
//             message: "User stored Successfully.",
//             status : true,
//             error : false,
//             user : newUser,
//             accessToken,
//             refreshToken
//         })
//     }
//     catch(e)
//     {
//       return res.status(500).json({
//             message: "some internal server error occured.",
//             status : false,
//             error : true,
//             e 
//         })
//     }
    
// }
// export async function getUserDetail(req,res){

//     try{

//         let {_id} = req.params;
//         console.log(_id);
//         const fetchedUser = await user.find({ _id });

//         res.status(200).json({
//             user: fetchedUser,
//             message: "User fetched successfully.",
//             status: true,
//             error: false,
//         });
//     }
//     catch(e)
//     {
//       return res.status(500).json({
//             message: "some internal server error occured.",
//             status : false,
//             error : true,
//             e 
//         })
//     }
    
// }

// export async function loginUser(req,res){
//     try {

//         const {email ,password} = req.body;
        

        
//         const user = await User.findOne({email});
        
//         if(!user)
//             {
//                 return res.status(400).json({
//                     message: "No Email found! Please register.",
//                     success : false,
//                     error : true
//                 })
//             }
            
//             if(user.status !== "Active")
//             {
//                 return res.status(400).json({
//                     message: "Contact Admin.",
//                     success : false,
//                     error : true
//                 })
//             }

//             user.last_login_date = new Date();
            

//             const cmp_password = await bcryptjs.compare(password,user.password);
    
//             if(!cmp_password)
//             {
//                 return res.status(400).json({
//                     message: "Incorrect Credientials.",
//                     success : false,
//                     error : true
//                 })
//             }
//             const { accessToken, refreshToken } = generateTokens(user._id);

//             setCookies(res, accessToken, refreshToken);
    
    

     
//             await user.save();


//         //console.log("request", req.cookies);

//              res.status(200).json({
//                 message: "Login success.",
//                 success : true,
//                 error : false,
//                 user,
//                 refreshToken,
//                 accessToken
//             })
            




      
//     } catch (error) {
//          res.status(400).json({
//             message: "Some internal server error.",
//             success : false,
//             error : true
//         })
//     }
// }

// export async function addAddress(req,res){
//     try {
        
//         let user = req.user;        
//         let address = await Address.create(req.body);

//         user.address_details.push(address._id);
//         user.mobile = req.body.mobile;
//         await user.save();
        

//         res.status(200).json({
//             status : true,
//             error : false,
//             data : address,
//             user
//         })
      
//     } catch (error) {
//          res.status(400).json({
//             message: error.message || error,
//             success : false,
//             error : true
//         })
//     }
// }
// export async function updateAddress(req,res){
//     try {
        
//         let user = req.user;    
//         let {id} = req.params;    
//         let data = req.body;
//         // let address = await Address.create(req.body);
//         console.log(data)
//         const address = await Address.findByIdAndUpdate(id,data,{new:true});

//         // user.address_details.push(address._id);
//         user.mobile = req.body.mobile;
//         await user.save();
        

//         res.status(200).json({
//             status : true,
//             error : false,
//             data : address,
//             user
//         })
      
//     } catch (error) {
//      res.status(400).json({
//             message: error.message || error,
//             success : false,
//             error : true
//         })
//     }
// }
// export async function deleteAddress(req,res){
//     try {
        
//         let user = req.user;        
//         let { id }= req.params;
//         console.log(id)

//         const address = await Address.findByIdAndDelete(id);

        
//         let data = user.address_details;

//         user.address_details = data.filter((add)=>add._id !== id);

//         await user.save();

//         res.status(200).json({
//             status : true,
//             error : false,
//         })
      
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({
//             message: error.message || error,
//             success : false,
//             error : true
//         })
//     }
// }
// export async function getAddress(req,res){
//     try {
        

//       let addresses = await Address.find({user : req.user._id})
//         res.status(200).json({
//             success : true,
//             error : false,
//             addresses
//         })
      
//     } catch (error) {
//         return res.status(400).json({
//             message: error.message || error,
//             success : false,
//             error : true
//         })
//     }
// }
// export async function logoutUser(req,res){
//     try {

//         const user = req.user;


//         const cookiesOption =  {
//             httpOnly : true,
//             secure : true,
//             sameSite : "None",
//             maxAge: 15 * 60 * 1000, // 15 minutes
//         }
//         res.clearCookie('accessToken',cookiesOption);
//         res.clearCookie('refreshToken',cookiesOption);

//          await User.findByIdAndUpdate( user._id,{
//             refresh_token : "",
//         })
     
//         return res.status(200).json({
//                 message: "Successfully logout.",
//                 success : true,
//                 error : false,
//                 cookies : req.cookies
//             })
        
      
        
//     } catch (error) {
//         //console.error("Logout error:", error);
//         return res.status(400).json({
//             message: "Some internal server error.",
//             success : false,
//             error : true
//         })
//     }
// }

// export async function updateUserDetails(req, res) {
//     try {
//         const user = req.user;
//         const { name, email, password, mobile } = req.body;
//         const image = req.file; // Check if file is uploaded

//         let updatedData = {};

//         // Update user details if provided
//         if (name) updatedData.name = name;
//         if (email) updatedData.email = email;
//         if (mobile) updatedData.mobile = mobile;
//         if (password) {
//             let salt = await bcryptjs.genSalt(13);
//             updatedData.password = await bcryptjs.hash(password, salt);
//         }

//         // Upload avatar if a file is provided
//         // console.log(image);
//         if (image) {
//             const upload = await uploadImageCloudinary(image);
//             updatedData.avatar = upload.url;
//         }

//         // Update the user in the database
//         const updatedUser = await User.findByIdAndUpdate(user._id, updatedData, { new: true });

//         if (!updatedUser) {
//             return res.status(404).json({
//                 message: "User not found.",
//                 status: false,
//                 error: true,
//             });
//         }

//         return res.status(200).json({
//             message: "User updated successfully.",
//             status: true,
//             error: false,
//             data: updatedUser,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message || "Internal server error.",
//             status: false,
//             error: true,
//         });
//     }
// }

// export async function forgotPassword(req, res) {
//     try {
//         const { email } = req.body;

//         if (!email) {
//             return res.status(400).json({
//                 message: "Email is required.",
//                 status: false,
//                 error: true,
//             });
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found.",
//                 status: false,
//                 error: true,
//             });
//         }

//         const otp = generateOpt();

//         const expireTime = Date.now() + 60 * 60 * 1000;

//         const updateFeild = await User.findByIdAndUpdate(user._id, {
//             forgot_password_expiry : new Date(expireTime).toISOString(),
//             forgot_password_otp : otp
//         })



//         // const token = generateToken({ userId: user._id }); // Your token generation logic
//         // const resetUrl = `.../reset-password?token=${token}`;
//         await sendEmail({
//             sendTo: email,
//             subject: "Password Reset",
//             html: forgotPasswordTemplate({name : user.name , otp}),
//         });

//         return res.status(200).json({
//             message: "Password reset email sent successfully.",
//             status: true,
//             error: false,
//             data : {
//                 otp,
//                 expireTime
//             }
//         });
//     } catch (e) {
//         return res.status(500).json({
//             message: "Internal server error.",
//             status: false,
//             error: true,
//             e,
//         });
//     }
// }
// export async function verifyForgotPassword(req, res) {
//     try {
//         const { email, otp } = req.body;

//         if (!email || !otp) {
//             return res.status(400).json({
//                 message: "Email and OTP are required.",
//                 status: false,
//                 error: true,
//             });
//         }

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found.",
//                 status: false,
//                 error: true,
//             });
//         }

//         // Compare expiry time
//         if (new Date() <= new Date(user.forgot_password_expiry)) {
//             if (otp === user.forgot_password_otp) {
//                 return res.status(200).json({
//                     message: "Authenticated Successfully.",
//                     status: true,
//                     error: false,
//                 });
//             } else {
//                 return res.status(400).json({
//                     message: "Incorrect OTP!",
//                     status: false,
//                     error: true,
//                 });
//             }
//         } else {
//             return res.status(408).json({
//                 message: "Connection timed out. Please request a new OTP.",
//                 status: false,
//                 error: true,
//             });
//         }
//     } catch (e) {
//         return res.status(500).json({
//             message: "Internal server error.",
//             status: false,
//             error: true,
//             details: e.message,
//         });
//     }
// }

// export async function resetPassword(req, res) {
//     try {
//         const { email, newPassword } = req.body;

//         if (!email || !newPassword) {
//             return res.status(400).json({
//                 message: "email and new password are required.",
//                 status: false,
//                 error: true,
//             });
//         }

//         // const decoded = verifyToken(token); // Your token verification logic
//         // if (!decoded) {
//         //     return res.status(401).json({
//         //         message: "Invalid or expired token.",
//         //         status: false,
//         //         error: true,
//         //     });
//         // }

//         const salt = await bcryptjs.genSalt(13);
//         const hashPass = await bcryptjs.hash(newPassword, salt);

//         const user = await User.findOne({email});

//         if(!user)
//             return res.status(200).json({
//                 message: "No user found!",
//                 status: false,
//                 error: true,
//             });

//         await User.findByIdAndUpdate(user._id, { password: hashPass });

//         return res.status(200).json({
//             message: "Password reset successfully.",
//             status: true,
//             error: false,
//         });
//     } catch (e) {
//         return res.status(500).json({
//             message: "Internal server error.",
//             status: false,
//             error: true,
//             e,
//         });
//     }
// }
// export async function verifyUser(req, res) {
//     try {
//         const { token } = req.query;

//         if (!token) {
//             return res.status(400).json({
//                 message: "Verification token is required.",
//                 status: false,
//                 error: true,
//             });
//         }

//         // const decoded = verifyToken(token); // Your token verification logic
//         // if (!decoded) {
//         //     return res.status(401).json({
//         //         message: "Invalid or expired token.",
//         //         status: false,
//         //         error: true,
//         //     });
//         // }

//         await User.findByIdAndUpdate(userId, { isVerified: true });

//         return res.status(200).json({
//             message: "User verified successfully.",
//             status: true,
//             error: false,
//         });
//     } catch (e) {
//         return res.status(500).json({
//             message: "Internal server error.",
//             status: false,
//             error: true,
//             e,
//         });
//     }
// }
// export async function refreshToken(req, res) {
//     try {
//         // const { token } = req.body;
//         const refreshToken = req.cookies.refreshToken || req?.header?.authorisation?.split(" ")[1];



//         if (!refreshToken) {
//             return res.status(400).json({
//                 message: "Refresh token is available.",
//                 status: false,
//                 error: true,
//             });
//         }

//         const verifyToken = await jwt.verify(refreshToken ,process.env.SECRET_KEY_REFRESH_TOKEN)

//         if(!verifyToken)
//         {
//             return res.status(400).json({
//                 message: "Refresh token has expired.",
//                 status: false,
//                 error: true,
//             });
//         }

//         // const decoded = verifyToken(token); // Your token verification logic
//         // if (!decoded) {
//         //     return res.status(401).json({
//         //         message: "Invalid or expired token.",
//         //         status: false,
//         //         error: true,
//         //     });
//         // }

//         const newAccessToken = generateAccessToken({ userId: verifyToken.id }); 

        
//         const cookiesOption = {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production', 
//             sameSite: 'None',
//         };


//         res.cookie('accessToken', newAccessToken,cookiesOption);

//         return res.status(200).json({
//             message: "Token refreshed successfully.",
//             status: true,
//             error: false,
//             data: { accessToken: newAccessToken },
//         });
//     } catch (e) {
//         return res.status(500).json({
//             message: "Internal server error.",
//             status: false,
//             error: true,
//             e,
//         });
//     }
// }


// export  async function verifyToken(req, res) {
    
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'Token is required' });
  
//     try {
//       const verified = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
//       res.status(200).json({ valid: true, user: verified });
//     } catch (err) {
//       res.status(403).json({ valid: false, message: 'Invalid or expired token' });
//     }
//   };
  
// export const getProfile = async (req, res) => {
// 	try {
// 		res.status(200).json({user : req.user});
// 	} catch (error) {
// 		res.status(500).json({ message: "Server error", error: error.message });
// 	}
// };