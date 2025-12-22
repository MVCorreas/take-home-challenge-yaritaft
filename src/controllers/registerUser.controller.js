import { registerUserService } from "../services/registerUser.service.js";

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("email, pass", email, password);
  try {
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
    res.status(500).json({ error: error.message });
  }
};
