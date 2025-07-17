import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";
import ContactUsModel from "../models/ContactUsModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, answer } = req.body;

    //Validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    // Name can start with a letter or underscore
    if (!/^[a-zA-Z_]/.test(name)) {
      return res.send({
        message: "Name should start with a letter or underscore",
      });
    }

    if (!email) {
      return res.send({ message: "Email is required" });
    }
    // Validate email format and domain
    if (
      !/\S+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|jimsindia.org)\b/.test(
        email
      )
    ) {
      return res.send({
        message:
          "Invalid email format or domain. Please use a popular email domain such as Gmail, Yahoo, Hotmail, or Outlook.",
      });
    }

    if (!password) {
      return res.send({ message: "Password is required" });
    }
    // Password should be minimum 8 characters and maximum 30 characters,
    // and should contain at least one uppercase letter, one lowercase letter, one number, and one special character
    if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}/.test(
        password
      )
    ) {
      return res.send({
        message:
          "Password must be 8-30 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    if (!phone) {
      return res.send({ message: "Phone No. is required" });
    }
    // Phone number should be 10 digits
    if (!/^\d{10}$/.test(phone)) {
      return res.send({ message: "Phone number should be 10 digits" });
    }

    // if (!address) {
    //   return res.send({ message: "Address is required" });
    // }

    if (!answer) {
      return res.send({ message: "Answer is required" });
    }

    //check user
    const existingUsers = await userModel.findOne({ email });
    //existing users
    if (existingUsers) {
      return res.status(200).send({
        success: false,
        message: "Already Registered Please LOGIN",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token genreation
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Sucessfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        // address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in LOGIN",
    });
  }
};

//Forgetting Password
export const forgetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }

    //check email and password
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//update profile
// export const updateProfileController = async (req, res) => {
//   try {
//     const { name, email, password, address, phone } = req.body;
//     const user = await userModel.findById(req.user._id);

//     //password
//     if (password && password.length <= 8) {
//       return res.json({
//         error:
//           "Password is required and should of more than or equal to 8 characters",
//       });
//     }
//     const hashedPassword = password ? await hashPassword(password) : undefined;
//     const updatedUser = await userModel.findByIdAndUpdate(
//       req.user._id,
//       {
//         name: name || user.name,
//         password: hashedPassword || user.password,
//         phone: phone || user.phone,
//         address: address || user.address,
//       },
//       { new: true }
//     );
//     res.status(200).json({
//       success: true,
//       message: "Profile Updated",
//       updatedUser,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       success: false,
//       message: "Error while updating user profile",
//       error,
//     });
//   }
// };

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    // Password
    let hashedPassword;
    if (password) {
      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Password should be at least 8 characters long",
        });
      }
      hashedPassword = await hashPassword(password);
    }

    // Update user data if provided
    const updatedUserData = {
      name: name || user.name,
      password: hashedPassword || user.password,
      phone: phone || user.phone,
      // address: address || user.address,
    };

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      updatedUserData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile Updated",
      updatedUser,
    });
  } catch (error) {
    console.error("Error while updating user profile:", error.message);
    res.status(400).json({
      success: false,
      message: "Error while updating user profile",
      error: error.message,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

export const ContactUsController = async (req, res) => {
  try {
    const { fullname, email, message } = req.body;

    //Validations
    if (!fullname) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!message) {
      return res.send({ message: "Message is required" });
    }
    //save
    const user = await new ContactUsModel({
      fullname,
      email,
      message,
    }).save();

    res.status(201).send({
      success: true,
      message: "Message Sended Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Message Transfer",
      error,
    });
  }
};
