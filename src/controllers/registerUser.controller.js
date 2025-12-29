import { registerUserService } from "../services/registerUser.service.js";
import { ValidationError } from "../utils/errors.js";
import { validators } from "../utils/validators.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError("Email and password are required");
    }

    if (!validators.isValidEmail(email)) {
      throw new ValidationError("Invalid email format");
    }

    const { user, token } = await registerUserService.registerUser(
      email,
      password
    );

    res.status(201).json({
      message: "User registered correctly",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
