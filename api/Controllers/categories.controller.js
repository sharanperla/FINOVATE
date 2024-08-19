import { db } from "../firebase/firebaseConfig.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore"; 

export const createCategory = async (req, res) => {
    const { name, icon, userId } = req.body;
    try {
      const newCategory = {
        name,
        icon: icon || null, // Optional icon field
        userId // Associate category with user
      };
      const docRef = await addDoc(collection(db, "category"), newCategory);
      console.log("Document written with ID: ", docRef.id);
  
      // Respond with success
      res.status(201).json({ message: "Category created successfully", id: docRef.id });
    } catch (e) {
      console.error("Error adding document: ", e);
      res.status(500).json({ error: "Failed to create category" });
    }
  };

export const getCategories=async(req,res)=>{
  const {userId}=req.params;
  try {
    const categoriesRef = collection(db, "category");
    const q = query(categoriesRef, where("userId", "==", userId));
    const categoriesSnapshot = await getDocs(q);
    console.log(categoriesSnapshot);
    const categories = categoriesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const getCategoryById = async (req, res) => {
  const { Id } = req.params;

  try {
    // Create a document reference for the category
    const categoryDocRef = doc(db, "category", Id);

    //  Fetch the document
    const categoryDoc = await getDoc(categoryDocRef);

    //  Check if the document exists
    if (!categoryDoc.exists()) {
      return res.status(404).json({ message: "Category not found" });
    }

    //  Send the document data in the response
    res.status(200).json({
      id: categoryDoc.id,
      ...categoryDoc.data(),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// // Delete category
export const deleteCategory = async (req, res) => {
  const { Id } = req.params;

  try {
    const categoryDocRef = doc(db, "category", Id);
    const categoryDoc = await getDoc(categoryDocRef);

    if (!categoryDoc.exists) {
      return res.status(404).json({ message: "Category not found" });
    }

    await deleteDoc(categoryDocRef);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// // Update category
// export const updateCategory = async (req, res) => {
//   const { id } = req.params;
//   const { name, icon } = req.body;

//   try {
//     const categoryDoc = await db.collection('categories').doc(id).get();

//     if (!categoryDoc.exists) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     await db.collection('categories').doc(id).update({
//       name,
//       icon
//     });

//     res.status(200).json({ message: "Category updated successfully" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


