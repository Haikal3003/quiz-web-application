import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import QuizService from '../../../services/QuizService';
import QuizCard from '../../../components/Admin/QuizCard';

const QuizManagementPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const allQuiz = await QuizService.getAllQuizzes();
        setQuizzes(allQuiz);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDeleteQuizById = (id) => {
    const deletedQuiz = quizzes.filter((quiz) => quiz.id !== id);
    setQuizzes(deletedQuiz);
  };

  return (
    <section id="quiz-management-page">
      <h1 id="heading">Quiz Management</h1>

      <div id="quiz-management-content" className="my-16">
        <Link to={`${location.pathname}/create-quiz`} className="w-[140px] h-[50px] rounded-full text-[12px] flex justify-center items-center border-[1px] border-darkTheme-gray font-semibold hover:bg-darkTheme-gray transition">
          Create Quiz
        </Link>

        <div id="quiz-card-container" className="grid grid-cols-2 mt-10 gap-8 justify-between">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} onDeleteQuizById={handleDeleteQuizById} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuizManagementPage;
