import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AUTH_API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  //   Auth login
  async login(email, password) {
    try {
      const res = await axios.post(AUTH_API_URL + 'login', { email, password });
      if (res.data.token) {
        localStorage.setItem('user', JSON.stringify(res.data));
      }

      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  //   Auth logout
  logout() {
    localStorage.removeItem('user');
  }

  //   Auth register
  async register(username, email, password) {
    try {
      const res = await axios.post(AUTH_API_URL + 'register', { username, email, password });

      if (!res.data.role) {
        res.data.role = 'user';
      }

      console.log(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  //   get current user
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  //   get user role
  getUserRole() {
    const user = this.getCurrentUser();
    return user ? user.role : 'user';
  }
}

export default new AuthService();
