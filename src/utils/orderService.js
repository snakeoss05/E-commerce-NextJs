export const createOrder = async (orderData) => {
  try {
    const response = await fetch(
      "https://e-commerce-backend-dvaf.onrender.com/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
export const getOrdersById = async (orderId, page) => {
  try {
    const response = await fetch(
      `https://e-commerce-backend-dvaf.onrender.com/api/orders/${orderId}?page=${page}&limit=8`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    throw error;
  }
};
export const getOrders = async () => {
  try {
    const response = await fetch(
      "https://e-commerce-backend-dvaf.onrender.com/api/orders",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    throw error;
  }
};
