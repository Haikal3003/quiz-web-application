import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuizService from '../../../services/QuizService';
import QuizCard from './QuizCard';

const ManageQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const allQuiz = await QuizService.getAllQuizzes();
        setQuizzes(allQuiz);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuiz();
  }, []);

  const handleDeleteQuiz = (id) => {
    const deletedQuiz = quizzes.filter((quiz) => quiz.id !== id);
    setQuizzes(deletedQuiz);
  };

  return (
    <section id="admin-manage-quiz">
      <h1 id="heading">Manage Quiz</h1>
      <div className="pt-[40px] w-full">
        <div className="w-full ">
          <Link to={'/admin/manage-quiz/add-quiz'}>
            <button type="button" className=" w-[140px] h-[42px] rounded-full bg-black text-white">
              Create Quiz
            </button>
          </Link>
        </div>

        <div id="quiz-card-container" className="grid grid-cols-3 gap-3 my-10">
          {quizzes.map((quiz) => {
            return <QuizCard key={quiz.id} quiz={quiz} onDeleteQuiz={handleDeleteQuiz} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default ManageQuiz;
