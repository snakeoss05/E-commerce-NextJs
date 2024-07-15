export const createAddress = async (address, id) => {
  try {
    const response = await axios.post(
      `https://e-commerce-backend-dvaf.onrender.com /api/addresses/${id}`,
      address
    );
    return response.data;
  } catch (err) {
    toast.error(err.message);
  }
};

export const deleteAddress = async () => {
  try {
    const response = await axios.delete(
      `https://e-commerce-backend-dvaf.onrender.com /api/addresses/${user._id}`
    );
    return response.data;
  } catch (err) {
    console.error("Error creating wishlist:", err);
    throw err;
  }
};
export const getAddresses = async (id) => {
  try {
    const response = await axios.get(
      `https://e-commerce-backend-dvaf.onrender.com /api/addresses/${id}`
    );
    return response.data;
  } catch (err) {
    console.error("Error creating wishlist:", err);
    throw err;
  }
};
