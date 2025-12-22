import { loginUserService } from "../services/loginUser.service.js";
import { ValidationError } from "../utils/errors.js";

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError("Email and password are required");
    }
    const { user, token } = await loginUserService.loginUser(email, password);

    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
