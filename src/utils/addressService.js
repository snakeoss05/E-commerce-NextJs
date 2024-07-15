export const createAddress = async (address, id) => {
  try {
    const response = await axios.post(
      `http://192.168.1.2:3001/api/addresses/${id}`,
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
      `http://192.168.1.2:3001/api/addresses/${user._id}`
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
      `http://192.168.1.2:3001/api/addresses/${id}`
    );
    return response.data;
  } catch (err) {
    console.error("Error creating wishlist:", err);
    throw err;
  }
};
