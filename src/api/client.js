import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Auth endpoints
  async login(credentials) {
    const response = await this.client.post('/auth/login', credentials);
    return response.data;
  }

  async getMe() {
    const response = await this.client.get('/auth/me');
    return response.data;
  }

  // User endpoints
  async getUsers() {
    const response = await this.client.get('/users/');
    return response.data;
  }

  async getUserById(id) {
    const response = await this.client.get(`/users/${id}/`);
    return response.data;
  }

  async createUser(user) {
    const response = await this.client.post('/users/', user);
    return response.data;
  }

  async updateUser(id, user) {
    const response = await this.client.put(`/users/${id}/`, user);
    return response.data;
  }

  async deleteUser(id) {
    await this.client.delete(`/users/${id}/`);
  }

  // Blog endpoints
  async getBlogs() {
    const response = await this.client.get('/blogs/');
    return response.data;
  }

  async getBlogById(id) {
    const response = await this.client.get(`/blogs/${id}/`);
    return response.data;
  }

  async createBlog(blog) {
    const response = await this.client.post('/blogs/', blog);
    return response.data;
  }

  async updateBlog(id, blog) {
    const response = await this.client.put(`/blogs/${id}/`, blog);
    return response.data;
  }

  async deleteBlog(id) {
    await this.client.delete(`/blogs/${id}/`);
  }

  // Portfolio endpoints
  async getPortfolios() {
    const response = await this.client.get('/portfolios/');
    return response.data;
  }

  async getPortfolioById(id) {
    const response = await this.client.get(`/portfolios/${id}/`);
    return response.data;
  }

  async createPortfolio(portfolio) {
    const response = await this.client.post('/portfolios/', portfolio);
    return response.data;
  }

  async updatePortfolio(id, portfolio) {
    const response = await this.client.put(`/portfolios/${id}/`, portfolio);
    return response.data;
  }

  async deletePortfolio(id) {
    await this.client.delete(`/portfolios/${id}/`);
  }

  // Testimonial endpoints
  async getTestimonials() {
    const response = await this.client.get('/testimonials/');
    return response.data;
  }

  async getTestimonialById(id) {
    const response = await this.client.get(`/testimonials/${id}/`);
    return response.data;
  }

  async createTestimonial(testimonial) {
    const response = await this.client.post('/testimonials/', testimonial);
    return response.data;
  }

  async updateTestimonial(id, testimonial) {
    const response = await this.client.put(`/testimonials/${id}/`, testimonial);
    return response.data;
  }

  async deleteTestimonial(id) {
    await this.client.delete(`/testimonials/${id}/`);
  }
}

export const apiClient = new ApiClient();
