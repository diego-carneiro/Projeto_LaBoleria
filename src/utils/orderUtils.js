export function ordersQueryToObject(orderRow) {
    const [
        clientId, clientName, address, phone,
        cakeId, cakeName, price, description, image,
        createdAt, quantity, totalPrice,
    ] = orderRow;

    return {
        client: {
            id: clientId,
            name: clientName,
            address,
            phone,
        },
        cake: {
            id: cakeId,
            name: cakeName,
            price,
            description,
            image,
        },
        createdAt,
        quantity,
        totalPrice,
    };
}

export function clientOrdersToObject(orderRow) {
    const [
      orderId, quantity, createdAt, totalPrice,
      name,
    ] = orderRow;
  
    return {
      orderId,
      quantity,
      createdAt,
      totalPrice,
      name,
    };
  }