import connection from "../database.js"
import { clientOrdersToObject } from "../utils/orderUtils.js";

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

};

export async function getClientOrders(request, response){
    const clientId = request.params.id;

    try {
        const clients = await connection.query(`
            SELECT * 
            FROM clients
            WHERE id = $1
        `, [clientId]);

        if (!clients.rowCount) {
            return response.sendStatus(404);
        }

        const clientOrders = await connection.query({
            text: `
                SELECT o.id as "orderId", o.quantity, TO_CHAR(o."createdAt", 'YYYY-MM-DD HH24:MI'), o."totalPrice", cakes.name "cakeName"
                FROM orders AS o
                JOIN clients ON clients.id = o."clientId"
                JOIN cakes ON cakes.id = o."cakeId"
                WHERE clients.id = $1;
            `, values: [clientId], rowMode: "array",

        });

        const formattedQuery = clientOrders.rows.map(clientOrdersToObject);

        return response.status(200).send(formattedQuery);
        
    } catch (error) {
        console.error(error)
    }
}