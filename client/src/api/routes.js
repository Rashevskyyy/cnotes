import api from "./api";

export const loginApi = async (data) => {
  const response = await api.post("/login", data);
  return response.data;
};

export const registerApi = async (data) => {
  const response = await api.post("/register", data);
  return response.data;
};

export const uploadAvatar = async (formData) => {
  const response = await api.post(`/api/avatar`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateUserAvatar = async (userId, avatarUrl) => {
  const response = await api.put(`/users/avatar`, {
    userId,
    avatar: avatarUrl,
  });

  return response.data;
};

export const getUserInfo = async (token) => {
  try {
    const response = await api.get("/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting user info", error);
    throw error;
  }
};

export const updateUserInfo = async (userId, firstName, lastName) => {
  try {
    const response = await api.put(`/users/${userId}`, {
      firstName,
      lastName,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// export const logout = async () => {
//   const response = await api.post("/logout");
//   return response.data;
// };
