import Student from "../models/Student.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import mongoose from "mongoose";


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

      
      const {name, email, password , userType, pic,enrollment} = req.body.data;

      console.log(name, email, password , userType, pic);
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
          userType,
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

          // res.clearCookie('accessToken',cookiesOption);
          // res.clearCookie('refreshToken',cookiesOption);
  
          //  await Student.findByIdAndUpdate( user._id,{
            //     refresh_token : "",
            // })
            removeCookies(res);
       
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
        // const user = req.user;
        const { name, email, password, mobile } = req.body;
        console.log(req.body.data, email, password, mobile);
        if(!email)
        {
            return res.status(400).json({
                message: "Email is required.",
                status: false,
                error: true,
            });
        }

        const user = await Student.findOne({email}); // Get the user from the request
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

        console.log(user._id, updatedData);

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
export async function updateStudent(req, res) {
    try {

      const updatedResult = await Student.updateMany(
        {},
        {
          $set: {
            "academicRecords.$[].marks": 0,
            "academicRecords.$[].totalMarks": 0
          }
        }
      );


        res.status(200).json({
            message: "User updated successfully.",
            status: true,
            error: false,
            data: updatedResult,
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

export const getStudentByFilter = async (req, res) => {
	try {
    const { enroll } = req.query; 
    
    let user = await Student.findOne({enrollment : enroll})
    .populate('course')
    .populate('extracurricularActivities')
    .populate("academicRecords.subjectId")
    
    res.status(200).json({
      user,
    })


	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const assignCourse = async (req, res) => {
	try {
    const { id } = req.query; 
    
    
    let user = await Student.findByIdAndUpdate(id,{
      course : req.body.id
    },{ new: true } );
    // console.log(req.body, user);
    // user.course = req.body;
    // await user.save();

    res.status(200).json({
      user,
    })


	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const assignMarks = async (req, res) => {
	try {
   
    const data = req.body;
    let errors = [];

    const queues = data.map(async (item) => {
      const { studentId, subjectId, marks, totalMarks } = item;

      try {
        const student = await Student.findOneAndUpdate(
          { _id: studentId, "academicRecords.subjectId": subjectId },
          {
            $inc: {
              "academicRecords.$.marks": marks,
              "academicRecords.$.totalMarks": totalMarks,
            },
          },
          { new: true }
        );

        return student;


      } catch (error) {
        errors.push(error.message || error);
      }
    })

    const results = await Promise.all(queues);

    if(errors.length > 0) {
      return res.status(500).json({ message: "Some error occured", errors });
    }
    res.status(200).json({
      message: "Marks assigned successfully",
      error: false,
    })

	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message, e : errors });
	}
};


export const getStudents = async (req, res) => {
  try {
    const { semester, course } = req.query;

    const filter = {};

    // Only add filters if valid
    if (semester && semester !== "undefined") {
      filter.semester = semester;
    }

    if (course && course !== "undefined" && mongoose.Types.ObjectId.isValid(course)) {
      filter.course = new mongoose.Types.ObjectId(course);
    }

    console.log("Searching students with filter:", filter);

    const students = await Student.find(filter)
      .populate("course")
      .populate("academicRecords.subjectId");

    res.status(200).json({ data: students });
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

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
// router.post('/marks', isAuth, isTeacher, async (req, res) => {
//   try {
//     const { studentId, subjectId, marks, totalMarks } = req.body;
    
//     if (!studentId || !subjectId || marks === undefined || totalMarks === undefined) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }
    
//     // Validate marks
//     if (marks < 0 || totalMarks <= 0 || marks > totalMarks) {
//       return res.status(400).json({ message: 'Invalid marks or total marks' });
//     }
    
//     // Check if student exists
//     const student = await Student.findById(studentId);
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }
    
//     // Check if subject exists
//     const subject = await Academic.findById(subjectId);
//     if (!subject) {
//       return res.status(404).json({ message: 'Subject not found' });
//     }
    
//     // Calculate grade based on percentage
//     const percentage = (marks / totalMarks) * 100;
//     let grade = '';
    
//     if (percentage >= 90) grade = 'A+';
//     else if (percentage >= 80) grade = 'A';
//     else if (percentage >= 70) grade = 'B+';
//     else if (percentage >= 60) grade = 'B';
//     else if (percentage >= 50) grade = 'C';
//     else if (percentage >= 40) grade = 'D';
//     else grade = 'F';
    
//     // Check if academic record for this subject already exists
//     const existingRecordIndex = student.academicRecords.findIndex(
//       record => record.subjectId.toString() === subjectId
//     );
    
//     if (existingRecordIndex !== -1) {
//       // Update existing record
//       student.academicRecords[existingRecordIndex].marks += marks;
//       student.academicRecords[existingRecordIndex].totalMarks += totalMarks;
//       student.academicRecords[existingRecordIndex].grade = grade;
//     } else {
//       // Create new academic record
//       student.academicRecords.push({
//         marks,
//         totalMarks,
//         subjectId,
//         grade
//       });
//     }
    
//     await student.save();
    
//     return res.status(200).json({ 
//       message: 'Marks assigned successfully',
//       academicRecord: existingRecordIndex !== -1 ? 
//         student.academicRecords[existingRecordIndex] : 
//         student.academicRecords[student.academicRecords.length - 1]
//     });
    
//   } catch (error) {
//     console.error('Error assigning marks:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });