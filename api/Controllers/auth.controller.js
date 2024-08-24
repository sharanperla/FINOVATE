import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig.js";
import { collection, doc, setDoc } from "firebase/firestore";

export const signup = async (req, res) => {
  const {email,username, password} = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userData = {
        email: user.email,
        uid: user.uid, // Firebase UID
        createdAt: new Date(),
        username,
        // Add more user fields here if needed (e.g., name, profile image)
      };
      await setDoc(doc(db, "users", user.uid), userData);
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
      

        res.cookie('access_token',token,{httpOnly:true, secure: true, sameSite: 'Strict'}).status(200).json({
            message: "User signed in successfully",
            user: {
              userId: user.uid,
              email: user.email,
              // Include any additional user data as needed
            }
          });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const signOut= async (req, res, next) => {
    try {
     res.clearCookie('access_token', { httpOnly: true, secure: true, sameSite: 'Strict' });
     res.status(200).json({ message: "User has been logged out successfully" });
    } catch (error) {
        console.error("Error signing out:", error);
        res.status(500).json({ error: "Failed to sign out" });
    }
  }
  
