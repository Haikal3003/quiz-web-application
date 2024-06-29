import axios from 'axios';

const USER_API_URL = 'http://localhost:8080/api/users';

class UserService {
  async getAllUsers() {
    try {
      const res = await axios.get(USER_API_URL);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUserById(id) {
    try {
      const res = await axios.delete(USER_API_URL + `/delete/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserService();
