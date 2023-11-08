import { Insert, Select, Delete, Update } from "../model/usermodel.js";
import UserSchema from "../Schema/Userschema.js";
import ValidateSchema from "../checkSchema.js"

const TableName = "user";

export const fetchUserDetail = async (res, DB, user_id) => {

    try {
        const rows = await Select(DB, TableName, user_id);
        return rows

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export const addUserDetails = async (res, DB, data) => {

    const IsValidData = ValidateSchema(UserSchema, data)

    if (!IsValidData) return res.status(400).json({ error: 'Internal Server Error' });
    try {
        const result = await Insert(DB, TableName, data)
        return result
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export const updateUserDetail = async (res, DB, user_id, data) => {

    const IsValidData = ValidateSchema(UserSchema, data)
    if (!IsValidData) {
        res.status(403).json({ message: "invalid Data" });
    }
    try {
        const result = await Update(DB, TableName, data, user_id)
        res.json({ success: true, message: 'Update operation successful', result: result });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export const deleteUser = async (res, DB, user_id) => {

    try {
        await Delete(DB, TableName, user_id)
        res.json({ message: 'user details deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
} 