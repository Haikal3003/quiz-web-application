import React, { useEffect, useState } from 'react';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import QuizService from '../../../../services/QuizService';
import EditQuizForm from './EditQuizForm';
import Loader from '../../../../components/Loader';

const EditQuizPage = () => {
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { quizId } = useParams();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizData = await QuizService.getQuizById(quizId);
        setQuiz(quizData);
      } catch (error) {
        console.log('Failed to fetch quiz:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  console.log(quiz);

  const handleSaveUpdateQuiz = async (updatedQuiz) => {
    setLoading(true);
    try {
      const savedQuiz = await QuizService.updateQuiz(quizId, updatedQuiz);
      console.log('Quiz updated successfully:', savedQuiz);
      navigate(-1);
    } catch (error) {
      console.log('Error updating quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="edit-quiz-page">
      <div className="flex items-center gap-8">
        <div id="back-icon" className="w-[40px] h-[40px] flex justify-center items-center text-[15px] border-[1px] border-gray rounded-md hover:bg-black hover:text-white transition cursor-pointer" onClick={() => navigate(-1)}>
          <IoReturnUpBackOutline />
        </div>

        <h1 className="text-[17px] font-semibold">Update Quiz</h1>
      </div>

      <div className="my-[25px]">
        <EditQuizForm quiz={quiz} onSaveUpdateQuiz={handleSaveUpdateQuiz} />
      </div>

      {loading && <Loader />}
    </section>
  );
};

export default EditQuizPage;
