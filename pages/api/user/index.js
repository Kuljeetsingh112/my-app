// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import next from "next";
import { fetchUserDetail, updateUserDetail, deleteUser, addUserDetails } from "./controller/UserController.js"

export default async function handler(req, res) {

  if (req.method === "GET") {
    try {

      const { DB_name, user_id } = req.query;
      const userDetail = await fetchUserDetail(res, DB_name, user_id);
      res.status(200).json({ userDetail, message: "Data Fetched" });

    } catch (error) {

      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });

    }
  }



  if (req.method === "POST") {
    try {
      const { DB_name, user_name, Phone_number, Location } = req.body
      // Create the data object
      const data = {
        user_name,
        Phone_number,
        Location,
      };

      const rows = await addUserDetails(res, DB_name, data);

      res.status(200).json({ message: "User details added successfully", userDetail: rows });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }




  if (req.method === "PUT") {
    try {
      const { DB_name, user_id, user_name, Phone_number, Location } = req.body;

      if (!DB_name || !user_id || !user_name || !Phone_number || !Location) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const data = {
        user_name,
        Phone_number,
        Location,
      };

      await updateUserDetail(res, DB_name, user_id, data);

      res.status(200).json({ message: "User details updated successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }


  if (req.method === "DELETE") {
    try {
      const { DB_name, user_id } = req.body;

      if (!DB_name || !user_id) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      await deleteUser(res, DB_name, user_id);

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

