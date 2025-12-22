import { loginUserService } from "../services/loginUser.service.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password fields are required",
      });
    }

    const { user, token } = await loginUserService.loginUser(email, password);

    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.error("Error logging user:", error);
    res.status(500).json({
      error: "Server error while logging user",
      details: error.message,
    });
  }
};
