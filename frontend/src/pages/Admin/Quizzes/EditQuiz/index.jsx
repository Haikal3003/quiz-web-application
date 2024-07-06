import React, { useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { CiCircleQuestion } from 'react-icons/ci';
import QuizService from '../../../../services/QuizService';
import EditQuizForm from './EditQuizForm';

const EditQuizPage = () => {
  const [quiz, setQuiz] = useState({});
  const navigate = useNavigate();
  const { quizId } = useParams();

  useEffect(() => {
    const fetchQuiz = async (id) => {
      try {
        const quizById = await QuizService.getQuizById(id);
        setQuiz(quizById);

        console.log(quizById);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuiz(quizId);
  }, [quizId]);

  const handleSaveUpdateQuiz = async (updatedQuiz) => {
    try {
      const saveUpdatedQuiz = await QuizService.updateQuiz(quizId, updatedQuiz);
      console.log(saveUpdatedQuiz);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="edit-quiz-page">
      <div id="header" className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-10">
          <div
            id="back-icon"
            className="w-[40px] h-[40px] rounded-xl border-[1px] border-darkTheme-gray text-[22px] hover:bg-darkTheme-gray text-white transition flex justify-center items-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowRoundBack />
          </div>
          <h2 className="text-[16px] font-semibold">Update Quiz</h2>
        </div>

        <div>
          <button id="publish-quiz-button" type="button" className="w-[140px] h-[40px] bg-darkTheme-gray rounded-xl" onClick={() => document.getElementById('edit-quiz-form').requestSubmit()}>
            Save Quiz
          </button>
        </div>
      </div>

      <div id="content" className="relative w-full h-auto border-[1px] border-darkTheme-gray rounded-2xl my-10">
        <div id="content-header" className="flex justify-start items-center gap-5 border-b-[1px] border-darkTheme-gray p-6">
          <div className="w-[35px] h-[35px] text-[20px] flex justify-center items-center border-[1px] border-darkTheme-gray rounded-xl">
            <CiCircleQuestion />
          </div>
          <div>
            <h3 className="font-semibold text-[13px]">Quiz</h3>
            <p>Please complete the field and choose a correct answer</p>
          </div>
        </div>
        <div className="p-6">
          <EditQuizForm quiz={quiz} onSaveUpdateQuiz={handleSaveUpdateQuiz} />
        </div>
      </div>
    </section>
  );
};

export default EditQuizPage;
