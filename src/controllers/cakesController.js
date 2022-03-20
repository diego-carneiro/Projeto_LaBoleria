import connection from "../database.js"

export async function postCakes(request, response){
    const { name, price, description, image } = request.body;

    try {
        const queryCakes = await connection.query(`
            SELECT *
            FROM cakes
            WHERE name = $1   
        `, [name]);

        
        if (queryCakes.rowCount) {
            return response.sendStatus(409);
        }

        await connection.query(`
            INSERT INTO
            cakes (name, price, description, image)
            VALUES ($1, $2, $3, $4)
        `, [name, price, description, image]);

        response.sendStatus(201);

    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
}