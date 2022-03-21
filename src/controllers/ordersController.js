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
            orders ("clientId", "cakeId", quantity, "totalPrice", "createdAt")
            VALUES ($1, $2, $3, $4, LOCALTIMESTAMP(0))
        `, [clientId, cakeId, quantity, totalPrice]);

        response.sendStatus(201);

    } catch (error) {
        console.error(error);
    }
};

export async function getOrders(request, response) {
    const queryDate = request.query.date;

    if (queryDate) {
        const dateOrders = await connection.query({
            text: `
                SELECT clients.id AS "clientId", clients.name AS "clientName", clients.address, clients.phone, cakes.id AS "cakeId", cakes.name AS "cakeName", cakes.price, cakes.description, cakes.image, TO_CHAR(o."createdAt", 'YYYY-MM-DD HH24:MI'), o.quantity, o."totalPrice"
                FROM orders AS o
                JOIN clients ON clients.id = o."clientId"
                JOIN cakes ON cakes.id = o."cakeId"
                WHERE o."createdAt"::text LIKE $1
            `,
            values: [`${queryDate}%`], rowMode: "array"
        });
        
        if (!dateOrders.rowCount) {
            return response.status(404).send([]);
        }

        const formattedQuery = dateOrders.rows.map(ordersQueryToObject);

        return response.status(200).send(formattedQuery);
    }

    try {
        const allOrders = await connection.query({
            text: `
                SELECT clients.id AS "clientId", clients.name AS "clientName", clients.address, clients.phone, cakes.id AS "cakeId", cakes.name AS "cakeName", cakes.price, cakes.description, cakes.image, TO_CHAR(o."createdAt", 'YYYY-MM-DD HH24:MI'), o.quantity, o."totalPrice"
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

    if (!parseInt(orderId) || orderId < 1) {
        return response.sendStatus(400);
    }

    try {
        const order = await connection.query({
            text: `
                SELECT clients.*, cakes.id AS "cakeId", cakes.name AS "cakeName", cakes.price, cakes.description, cakes.image, TO_CHAR(orders."createdAt", 'YYYY-MM-DD HH24:MI'), orders.quantity, orders."totalPrice"
                FROM 
                    orders 
                    JOIN clients ON clients.id = "clientId"
                    JOIN cakes ON cakes.id = "cakeId"
                WHERE orders.id = $1;
            `, values: [orderId], rowMode: "array"
        });

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