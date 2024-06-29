import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuizService from '../../../../services/QuizService';
import { BiListUl } from 'react-icons/bi';

const ViewQuizPage = () => {
  const [quiz, setQuiz] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isNextDisable, setIsNextDisable] = useState(false);
  const [isPrevDisable, setIsPrevDisable] = useState(false);

  const { quizId } = useParams();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizById = await QuizService.getQuizById(quizId);
        setQuiz(quizById);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    setIsNextDisable(currentQuestionIndex === quiz.questions?.length - 1);
    setIsPrevDisable(currentQuestionIndex === 0);
  }, [currentQuestionIndex, quiz.questions]);

  const handleNextButton = () => {
    if (currentQuestionIndex < quiz.questions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevButton = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionListClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div id="view-quiz-page" className="relative w-full h-auto bg-yellow-200 flex flex-col justify-center py-24 px-[100px]">
      <div id="header">
        <h1 className="font-bold text-[2rem]">
          {quiz.title} #{quiz.id}
        </h1>
      </div>

      <div id="sub-header" className="flex  items-end pt-14 pb-4">
        <h3 className="font-semibold text-[12px]">
          Question {currentQuestionIndex + 1}
          <span className="font-medium"> of {quiz.questions?.length}</span>
        </h3>
      </div>

      <div className="w-full h-screen">
        <div id="view-quiz-modal" className="w-full flex justify-center gap-4">
          <div id="left-modal" className="relative w-full h-auto bg-white  rounded-xl p-10">
            <div id="question" className="mb-20">
              <h2 className="text-[12px]">
                {currentQuestionIndex + 1}. {quiz.questions?.[currentQuestionIndex]?.question}
              </h2>
            </div>
            <div id="option-container" className="gap-6">
              {quiz.questions?.[currentQuestionIndex]?.options.map((option, index) => (
                <div
                  key={index}
                  id={`option${index + 1}`}
                  className={`w-full h-[45px] border-[1px] border-slate-300 rounded-xl flex justify-start items-center px-4 text-[11px] mb-4 ${option === quiz.questions?.[currentQuestionIndex]?.correctAnswer ? 'bg-green-300' : ''}`}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-20">
              <button
                type="button"
                id="prev-button"
                className={`w-[150px] h-[45px] rounded-md   text-black font-bold bg-yellow-200 ${isPrevDisable ? 'bg-yellow-200' : 'hover:bg-yellow-300'}  transition`}
                onClick={handlePrevButton}
                disabled={isPrevDisable}
              >
                Prev
              </button>

              <button
                type="button"
                id="next-button"
                className={`w-[150px] h-[45px] rounded-md   text-black font-bold bg-yellow-200 ${isNextDisable ? 'bg-yellow-200' : 'hover:bg-yellow-300'} transition`}
                onClick={handleNextButton}
                disabled={isNextDisable}
              >
                Next
              </button>
            </div>
          </div>

          <div id="right-modal" className="w-1/2 h-full bg-white rounded-xl p-10 ">
            <div id="header" className="flex justify-between items-center">
              <h2 className="font-semibold text-[13px]">List of questions</h2>
              <span className="text-[15px]">
                <BiListUl />
              </span>
            </div>

            <div id="list-question-container" className="w-full flex justify-between items-center  mt-10">
              {quiz.questions?.map((_, index) => (
                <div
                  key={index}
                  id="shape"
                  className={`flex justify-center items-center border-[1px] text-[11px] flex-wrap gap-6 cursor-pointer border-yellow-300 font-semibold w-[45px] h-[45px]  rounded-xl ${
                    currentQuestionIndex === index ? 'bg-yellow-200' : 'hover:bg-yellow-200'
                  }`}
                  onClick={() => handleQuestionListClick(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuizPage;
