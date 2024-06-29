import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import QuizService from '../../../../services/QuizService';

const ViewQuizPage = () => {
  const [quiz, setQuiz] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
          <span className="font-medium"> of 5</span>
        </h3>
      </div>

      <div className="w-full h-screen">
        <div id="view-quiz-modal" className="w-full flex justify-center gap-4">
          <div id="left-modal" className="relative w-full h-auto bg-white rounded-xl p-10">
            <div id="question" className="mb-20">
              <h2 className="text-[12px]">Yang bener</h2>
            </div>
            <div id="option-container" className="gap-6">
              <div id="option1" className="w-full h-[45px] border-[1px] border-slate-300 rounded-xl flex justify-start items-center px-4 text-[11px] mb-4">
                A. Yang bener
              </div>

              <div id="option1" className="w-full h-[45px] border-[1px] border-slate-300 rounded-xl flex justify-start items-center px-4 text-[11px] mb-4">
                B. Yang bener
              </div>

              <div id="option1" className="w-full h-[45px] border-[1px] border-slate-300 rounded-xl flex justify-start items-center px-4 text-[11px] mb-4">
                C. Yang bener
              </div>

              <div id="option1" className="w-full h-[45px] border-[1px] border-slate-300 rounded-xl flex justify-start items-center px-4 text-[11px] mb-20">
                D. Yang bener
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button type="button" id="prev-button" className="w-[150px] h-[45px] rounded-md  bg-yellow-200 text-black font-bold hover:bg-yellow-300 transition ">
                Prev
              </button>

              <button type="button" id="next-button" className="w-[150px] h-[45px] rounded-md  bg-yellow-200 text-black font-bold hover:bg-yellow-300 transition ">
                Next
              </button>
            </div>
          </div>

          <div id="right-modal" className="w-1/2 h-[300px] bg-white rounded-xl p-10">
            yang bener
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuizPage;
