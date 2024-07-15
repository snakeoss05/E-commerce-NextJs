export const isAdminRole = async (id) => {
  try {
    const response = await fetch(
      `https://e-commerce-backend-dvaf.onrender.com /api/profile/${id}`,
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
