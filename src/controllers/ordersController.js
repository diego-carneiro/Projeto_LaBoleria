import connection from "../database.js"

export async function postOrder(request, response) {
    const { clientId, cakeId, quantity, totalPrice } = request.body;

    try {
        const queryClients = await connection.query(`
            SELECT * 
            FROM clients
            WHERE id = $1
        `)[clientId];

        if (!queryClients.rowCount) {
            return response.sendStatus(404)
        }

        await connection.query(`
            INSERT INTO
            clients (clientId, cakeId, quantity, totalPrice)
            VALUES ($1, $2, $3, $4)
        ` [clientId, cakeId, quantity, totalPrice]);

        response.sendStatus(201);

    } catch (error) {
        console.error(error);
    }
};

export async function getOrder(request, response) {
    const date = request.query.name;

    if (!date) {
        const allOrders = await connection.query(`
            SELECT * 
            FROM orders
        `);

    }
};