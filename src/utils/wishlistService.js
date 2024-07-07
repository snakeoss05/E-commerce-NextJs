export const getWishlistById = async (id) => {
  try {
    const response = await fetch(`/api/wishlist/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

export const createWishlist = async (productId, id) => {
  if (!id) return;
  try {
    const response = await fetch(`/api/wishlist/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productId),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    throw error;
  }
};

export const updateWishlistById = async (id, updateData) => {
  try {
    const response = await fetch(`/api/wishlist/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error updating wishlist:", error);
    throw error;
  }
};

export const deleteWishlistById = async (id) => {
  try {
    const response = await fetch(`/api/wishlist/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting wishlist:", error);
    throw error;
  }
};
