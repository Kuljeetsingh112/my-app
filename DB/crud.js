import pool from "./connection.js";

const executeQuery = async (query, DB_name, data = null) => {
    let connection = null;
    try {
        connection = await pool.getConnection();
        await connection.query(`USE ${DB_name}`);
        const [rows] = data ? await connection.query(query, data) : await connection.query(query);
        return [rows];
    } catch (error) {
        throw new Error(error);
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

export const selectUser = async (query, DB_name) => {
    return executeQuery(query, DB_name);
}

export const createUser = async (query, data, DB_name) => {
    return executeQuery(query, DB_name, data);
}

export const deleteUser = async (query, DB_name) => {
    return executeQuery(query, DB_name);
}

export const updateUser = async (query, DB_name, data) => {
    return executeQuery(query, DB_name, data);
}
