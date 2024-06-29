import axios from 'axios';

const AUTH_API_URL = 'http://localhost:8080/api/auth';

class AuthService {
  async login(email, password) {
    try {
      const res = await axios.post(AUTH_API_URL + '/login', { email, password });

      localStorage.setItem('user', JSON.stringify(res.data));

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

  async register(username, email, password) {
    try {
      const res = await axios.post(AUTH_API_URL + '/register', { username, email, password });

      if (res.data.role === null) {
        res.data.role = 'member';
      }

      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUserRole() {
    const user = this.getCurrentUser();
    return user ? user.role : 'member';
  }
}

export default new AuthService();
