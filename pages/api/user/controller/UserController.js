import { Insert, Select, Delete, Update } from "../model/usermodel.js";
import UserSchema from "../Schema/Userschema.js";
import ValidateSchema from "../checkSchema.js"

const TableName = "user";

const sendErrorResponse = (res, status, message) => {
    res.status(status).json({ error: message });
};

export const fetchUserDetail = async (res, DB, user_id) => {

    try {
        const rows = await Select(DB, TableName, user_id);
        if (!rows || rows.length === 0) {
            sendErrorResponse(res, 404, 'User not found');
        } else {
            res.json({ message: "data Fetched", Data: rows });
        }

    } catch (error) {
        sendErrorResponse(res, 500, error.message)
    }
}


export const addUserDetails = async (res, DB, data) => {

    const IsValidData = ValidateSchema(UserSchema, data)
    if (!IsValidData) {
        sendErrorResponse(res, 400, "Data is Not valid")
        return;
    }

    try {
        const result = await Insert(DB, TableName, data)
        res.json({ success: true, message: 'User added successfully', result });

    } catch (error) {
        sendErrorResponse(res, 500, error.message)
    }
}


export const updateUserDetail = async (res, DB, user_id, data) => {

    const IsValidData = ValidateSchema(UserSchema, data)
    if (!IsValidData) {
        res.status(403).json({ message: "invalid Data" });
        return;
    }
    try {
        const result = await Update(DB, TableName, data, user_id)

        if (result.affectedRows === 0) {
            sendErrorResponse(res, 404, 'User not found');
        } else {
            res.json({ success: true, message: 'Update operation successful', result });
        }

    } catch (error) {
        sendErrorResponse(res, 500, error.message)
    }
}


export const deleteUser = async (res, DB, user_id) => {

    try {

        const result = await Delete(DB, TableName, user_id)
        if (result.affectedRows === 0) {
            sendErrorResponse(res, 404, 'User not found');
        } else {
            res.json({ message: 'User details deleted successfully' });
        }

    } catch (error) {
        sendErrorResponse(res, 500, error.message)
        // res.status(500).json({ error: 'Internal Server Error' });
    }
} 