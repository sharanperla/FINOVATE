import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.js";

export const signup = async (req, res) => {
  const {username,email, password } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signin=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const validUser=await signInWithEmailAndPassword(auth, email, password);
        const user=validUser.user;
        const token = await user.getIdToken();
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const signOut= async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('user has been logged out'); 
    } catch (error) {
        console.error("Error signing out:", error);
    }
  }
  
