export const createOrder = async (orderData) => {
  try {
    const response = await fetch(
      "https://e-commerce-backend-dvaf.onrender.com /api/orders",
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
      `https://e-commerce-backend-dvaf.onrender.com /api/orders/${orderId}?page=${page}&limit=8`,
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
export const DeleteOrder = async (orderId) => {
  try {
    const response = await fetch(
      `https://e-commerce-backend-dvaf.onrender.com /api/orders/${orderId}`,
      {
        method: "DELETE",
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
export const getOrdersProducts = async (orderId) => {
  try {
    const response = await fetch(
      `https://e-commerce-backend-dvaf.onrender.com /api/orders/getOrderProducts/${orderId}`,
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
export const getOrdersByOderId = async (orderId) => {
  try {
    const response = await fetch(
      `https://e-commerce-backend-dvaf.onrender.com /api/orders/getOrderByOderId/${orderId}`,
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
export const getOrders = async (page) => {
  try {
    const response = await fetch(
      `https://e-commerce-backend-dvaf.onrender.com /api/orders?page=${page}&limit=8`,
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
export const updateOrderStatus = async (orderId, orderData) => {
  try {
    const response = await fetch(
      `https://e-commerce-backend-dvaf.onrender.com /api/orders/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: orderData }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    throw error;
  }
};
export const generateInvoice = async (orderId) => {
  try {
    const response = await fetch(
      `https://e-commerce-backend-dvaf.onrender.com /api/orders/generateInvoice/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to download invoice");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice_${orderId}.pdf`; // Ensure this matches the expected filename
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading invoice:", error);
  }
};
