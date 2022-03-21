import connection from "../database.js"
import { ordersQueryToObject } from "../utils/orderUtils.js"

export async function postOrders(request, response) {
    const { clientId, cakeId, quantity, totalPrice } = request.body;

    try {
        const queryClients = await connection.query(`
            SELECT * 
            FROM clients
            WHERE id = $1
        `, [clientId]);

        if (!queryClients.rowCount) {
            return response.sendStatus(404)
        }

        const queryCakes = await connection.query(`
            SELECT * 
            FROM cakes
            WHERE id = $1
        `, [cakeId]);

        if (!queryCakes.rowCount) {
            return response.sendStatus(404)
        }

        await connection.query(`
            INSERT INTO
            orders ("clientId", "cakeId", quantity, "totalPrice")
            VALUES ($1, $2, $3, $4)
        `, [clientId, cakeId, quantity, totalPrice]);

        response.sendStatus(200);

    } catch (error) {
        console.error(error);
    }
};

export async function getOrders(request, response) {
    const queryDate = request.query.date;

    try {
        const allOrders = await connection.query({
            text: `
                SELECT clients.id AS "clientId", clients.name AS "clientName", clients.address, clients.phone, cakes.id AS "cakeId", cakes.name AS "cakeName", cakes.price, cakes.description, cakes.image, o."createdAt", o.quantity, o."totalPrice"
                FROM orders AS o
                JOIN clients ON clients.id = o."clientId"
                JOIN cakes ON cakes.id = o."cakeId"
            `,
            rowMode: "array"
        });

        if (!allOrders.rowCount) {
            return response.status(404).send([]);
        }

        const formattedQuery = allOrders.rows.map(ordersQueryToObject);

        return response.status(200).send(formattedQuery);

    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
};

export async function getOrderById(request, response) {
    const orderId = request.params.id;

    if (!orderId) {
        return response.sendStatus(400);
    }

    try {
        const order = await connection.query({
            text: `
                SELECT clients.*, cakes.*, orders.*
                FROM 
                    orders 
                    JOIN clients ON clients.id = "clientId"
                    JOIN cakes ON cakes.id = "cakeId"
                WHERE orders.id = $1;
            `, values: [orderId], rowMode: "array"
        });
console.log(order.rows);
        if (!order.rowCount) {
            return response.sendStatus(404)
        }

        const formattedQuery = order.rows.map(ordersQueryToObject);

        return response.status(200).send(formattedQuery);

    } catch (error) {
        console.error(error);
        return response.sendStatus(500);
    }
};