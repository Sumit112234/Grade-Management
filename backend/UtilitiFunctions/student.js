import Student from "../models/Student.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";


const getEnroll = ()=>{
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = [];
    for (let i = 0; i < 5; i++) {
      digits.push(alphabet.charAt(Math.floor(Math.random() * alphabet.length)));
    }
    for (let i = 0; i < 5; i++) {
      digits.push(Math.floor(Math.random() * 10));
    }
    return digits.join('');
}


const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.SECRET_KEY_ACCESS_TOKEN, {
    expiresIn: "100m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.SECRET_KEY_REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
const setCookies = (res, accessToken, refreshToken) => {
    
  
  res.cookie("accessToken", accessToken, {
        httpOnly : true,
        secure : true,
        sameSite : "None",
    maxAge: 15 * 60 * 10000, // 15 minutes
  });
  res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        secure : true,
        sameSite : "None",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  // res.cookie("accessToken", accessToken, {
  // 	httpOnly: true, // prevent XSS attacks, cross site scripting attack
  // 	secure: process.env.NODE_ENV === "production",
  // 	sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
  // 	maxAge: 15 * 60 * 1000, // 15 minutes
  // });
  // res.cookie("refreshToken", refreshToken, {
  // 	httpOnly: true, // prevent XSS attacks, cross site scripting attack
  // 	secure: process.env.NODE_ENV === "production",
  // 	sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
  // 	maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  // });
};
const removeCookies = (res) => {
  res.cookie("accessToken",null);
  res.cookie("refreshToken",null);
};

export async function saveUser(req,res){

  try{

      
      const {name, email, password , type, pic,enrollment} = req.body.data;

      console.log(name, email, password , type, pic);
      if(!name || !email || !password)
      {
           res.status(500).json({
              message: "name or email or password is not coming.",
              status : false,
              error : true,
              data : {name ,email,password}
          })
      }
      
      const user = await Student.findOne({email});

      if(user)
      {
          return res.status(500).json({
              message: "Student already exists",
              status : false,
              error : true
          })
      }

      let salt = await bcryptjs.genSalt(13);
      let hashPass = await bcryptjs.hash(password,salt);
  

      let dataModel = {
          name,
          email : email.toLowerCase(),
          password : hashPass,
          type,
          pic : pic ? pic : "",
          enrollment : enrollment ? enrollment : getEnroll()
      }
      const newUser = await Student.create(dataModel);
      // console.log(newUser);
      const { accessToken, refreshToken } = generateTokens(newUser._id);

      setCookies(res, accessToken, refreshToken);
    
      // let data = new User(dataModel);
      // await data.save();

    //   let verifyEmailUrl = ".../verify?token=uniqueToken";
    //   let verify_email = sendEmail({
    //       sendTo : email,
    //       subject : "Verify Email",
    //       html : verifyEmailTemplate({
    //           name,
    //           url : verifyEmailUrl
    //       })
    //   })

      return res.status(200).json({
          message: "User stored Successfully.",
          status : true,
          error : false,
          user : newUser,
          accessToken,
          refreshToken
      })
  }
  catch(e)
  {
    return res.status(500).json({
          message: "some internal server error occured.",
          status : false,
          error : true,
          e 
      })
  }
  
}
export async function logoutUser(req,res){
      try {
  
          const user = req.user;
  
  
          const cookiesOption =  {
              httpOnly : true,
              secure : true,
              sameSite : "None",
              maxAge: 15 * 60 * 1000, // 15 minutes
          }

          removeCookies(res);
          // res.clearCookie('accessToken',cookiesOption);
          // res.clearCookie('refreshToken',cookiesOption);
  
          //  await Student.findByIdAndUpdate( user._id,{
          //     refresh_token : "",
          // })
       
          return res.status(200).json({
                  message: "Successfully logout.",
                  success : true,
                  error : false,
                  cookies : req.cookies
              })
          
        
          
      } catch (error) {
          //console.error("Logout error:", error);
          return res.status(400).json({
              message: "Some internal server error.",
              success : false,
              error : true
          })
      }
  }

export async function loginUser(req,res){
  try {

      const {enrollment, email ,password} = req.body.data;
      console.log(req.body)
      const user = await Student.findOne({email}) //&& await Student.findOne({enrollment});
      
      if(!user)
          {
              return res.status(400).json({
                  message: "No User with email and enorollment number found!",
                  success : false,
                  error : true
              })
          }
          
        

          

          const cmp_password = await bcryptjs.compare(password,user.password);
  
          if(!cmp_password)
          {
              return res.status(400).json({
                  message: "Incorrect Credientials.",
                  success : false,
                  error : true
              })
          }
          const { accessToken, refreshToken } = generateTokens(user._id);

          setCookies(res, accessToken, refreshToken);

      //console.log("request", req.cookies);

           res.status(200).json({
              message: "Login success.",
              success : true,
              error : false,
              user,
              refreshToken,
              accessToken
          })
          




    
  } catch (error) {
       res.status(400).json({
          message: "Some internal server error.",
          success : false,
          error : true,
          e : error
      })
  }
}



export async function updateStudentDetails(req, res) {
    try {
        const user = req.user;
        const { name, email, password, mobile } = req.body;
        const image = req.file; // Check if file is uploaded
        console.log(req.body);
        let updatedData = {};

        // Update user details if provided
        if (name) updatedData.name = name;
        if (email) updatedData.email = email;
        if (mobile) updatedData.mobile = mobile;
        if (password) {
            let salt = await bcryptjs.genSalt(13);
            updatedData.password = await bcryptjs.hash(password, salt);
        }

        // Upload avatar if a file is provided
        // console.log(image);
        if (image) {
            const upload = await uploadImageCloudinary(image);
            updatedData.profilePic = upload.url;
        }

        // Update the user in the database
        const updatedUser = await Student.findByIdAndUpdate(user._id, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found.",
                status: false,
                error: true,
            });
        }

        return res.status(200).json({
            message: "User updated successfully.",
            status: true,
            error: false,
            data: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error.",
            status: false,
            error: true,
        });
    }
}

export const getStudent = async (req, res) => {
	try {
		res.status(200).json({user : req.user});
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
// export const getStudents = async (req, res) => {
//   try {
//     const id = req.params;
//     const student = await Student.find({_id : id})
//       .populate("academicRecords")
//       .populate("skills")
//       .populate("extracurricularActivities")
//       .populate("courses");
//     res.status(200).json({data : student});
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// export const addStudent = async (req, res) => {
//   const { name, email, phone, age, grade, type } = req.body;
//   try {
//     const student = new Student({ name, email, phone, age, grade, type });
//     await student.save();
//     res.status(201).json(student);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
