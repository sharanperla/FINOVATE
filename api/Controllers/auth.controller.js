import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig.js";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";

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
              username:user.displayName
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
  

  export const updateUser = async (req, res) => {
    const { userId, email, password, username, profileImage } = req.body;
  console.log(userId);
    try {
      const user = auth.currentUser;
      
      // Check if the user is authenticated and matches the uid in the request
      if (!user || user.uid !== userId) {
        return res.status(403).json({ error: "Unauthorized request" });
      }
  
      // Update email if provided
      if (email && email !== user.email) {
        await updateEmail(user, email);
      }
  
      // Update password if provided
      if (password) {
        await updatePassword(user, password);
      }
  
      // Update profile details in Firebase Auth
      const updatedProfile = {};
      if (username) {
        updatedProfile.displayName = username;
      }
      if (profileImage) {
        updatedProfile.photoURL = profileImage;
      }
  
      if (Object.keys(updatedProfile).length > 0) {
        await updateProfile(user, updatedProfile);
      }
  
      // Update user data in Firestore
      const userRef = doc(db, "users", userId);
      const updatedUserData = {
        ...(email && { email }),
        ...(username && { username }),
        ...(profileImage && { profileImage }),
        updatedAt: new Date(),
      };
  
      await updateDoc(userRef, updatedUserData);
  
      res.status(200).json({ message: "User updated successfully", user: updatedUserData });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };