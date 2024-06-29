import axios from 'axios';

const QUIZ_API_URL = 'http://localhost:8080/api/quizzes';

class QuizService {
  async getAllQuizzes() {
    try {
      const res = await axios.get(QUIZ_API_URL);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getQuizById(id) {
    try {
      const res = await axios.get(QUIZ_API_URL + `/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async createQuiz(quiz) {
    try {
      const res = await axios.post(QUIZ_API_URL + '/add-quiz', quiz);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  async updateQuiz(id, quiz) {
    try {
      const res = await axios.put(QUIZ_API_URL + `/update/${id}`, quiz);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteQuiz(id) {
    try {
      const res = await axios.delete(QUIZ_API_URL + `/delete/${id}`);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new QuizService();
