export const isAdminRole = async (id) => {
  try {
    const response = await fetch(`http://192.168.1.2:3001/api/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    throw error;
  }
};
