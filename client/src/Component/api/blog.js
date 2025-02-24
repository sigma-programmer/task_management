// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createBlogPost = async (formData, thumbnail, ogImage) => {
  // const form = new FormData();
  
  // Append the main blog post data
  // form.append('data', JSON.stringify(formData));
  
  // Append files if they exist
  // if (thumbnail) {
    //   form.append('thumbnail', thumbnail);
    // }
    // if (ogImage) {
      //   form.append('ogImage', ogImage);
      // }
      console.log(formData)
      const response = await api.post('/api/posts', formData, {
        headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};










export const updateBlogPost = async (id, formData, thumbnail, ogImage) => {
  const form = new FormData();
  
  // Append the main data
  form.append('data', JSON.stringify(formData));
  
  // Append files if they exist
  if (thumbnail) {
    form.append('thumbnail', thumbnail);
  }
  if (ogImage) {
    form.append('ogImage', ogImage);
  }

  const response = await api.put(`/posts/${id}`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getBlogPost = async (slug) => {
  const response = await api.get(`/posts/${slug}`);
  return response.data;
};

export const getBlogPosts = async (page = 1, limit = 10, status) => {
  const response = await api.get('/posts', {
    params: { page, limit, status },
  });
  return response.data;
};

export const deleteBlogPost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export const togglePublishPost = async (id) => {
  const response = await api.patch(`/posts/${id}/publish`);
  return response.data;
};