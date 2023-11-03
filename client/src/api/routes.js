import api from "./api";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const fetchNotesByUser = createAsyncThunk(
    "notes/fetchNotes",
    async ({ category, value }) => {
      let endpoint = "/notes";
      if (category && value) {
        endpoint += `?${category}=${value}`;
      }
      const response = await api.get(endpoint);
      return response.data;
    }
);


export const fetchAllNotes = createAsyncThunk(
  "notes/fetchAllNotes",
    async ({ category, value }) => {
    let endpoint = "/notes/all";
    if (category && value) {
      endpoint += `?${category}=${value}`;
    }
    const response = await api.get(endpoint);
    return response.data;
  }
);

export const getNote = createAsyncThunk("notes/getNote", async (noteId) => {
  const response = await api.get(`/note/${noteId}`);
  return response.data;
});

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

export const updatePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.post(`/change-password`, {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNoteApi = async (formData) => {
  try {
    const response = await api.post(`/note`, formData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNoteCommentApi = async (noteId, formData) => {
  try {
    const response = await api.post(`/note/${noteId}/comments`, formData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const likeNoteApi = async (noteId) => {
  try {
    const response = await api.post(`/notes/${noteId}/toggle-like`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateNoteApi = async (noteId, formData) => {
  try {
    const response = await api.put(`/note/${noteId}`, formData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteNoteApi = async (noteId) => {
  try {
    const response = await api.delete(`/note/${noteId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
