import connection from "../database.js"

export async function postClients(request, response){
    const { name, address, phone } = request.body;

    try {
        const queryClients = await connection.query(`
            SELECT *
            FROM clients
            WHERE name = $1
        `, [name]);
        
        if (queryClients.rowCount) {
            return response.sendStatus(409)
        }   
        response.sendStatus(201);

        await connection.query(`
            INSERT INTO
            clients (name, address, phone)
            VALUES ($1, $2, $3)
        `, [name, address, phone]);

        response.sendStatus(201);
 
    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }

}