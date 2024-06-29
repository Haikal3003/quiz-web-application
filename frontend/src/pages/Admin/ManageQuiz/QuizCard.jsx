import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiDotsHorizontal } from 'react-icons/bi';
import QuizService from '../../../services/QuizService';

const QuizCard = ({ quiz, onDeleteQuiz }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleDeleteQuiz = async (id) => {
    try {
      const deleteQuiz = await QuizService.deleteQuiz(id);
      onDeleteQuiz(id);
      console.log('Delete quiz successfully ', deleteQuiz);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="quiz-card" className="relative w-full h-[200px] bg-white border-[1px] border-slate-200 rounded-xl">
      <div>
        <div className="relative w-full h-[80px] bg-yellow-200 rounded-t-xl ">
          <div id="dot-icon" className="absolute right-[15px] top-[15px] ">
            <button type="button" className="w-[25px] h-[25px] rounded-full bg-white text-black text-[12px] flex justify-center items-center " onClick={() => setIsMenuActive(!isMenuActive)}>
              <BiDotsHorizontal />
            </button>

            {isMenuActive && (
              <div className="absolute top-[30px] right-[0px] w-auto h-auto p-2 bg-white border-[1px] border-slate-200 rounded-full">
                <button type="button" className="w-[100px] h-[30px] bg-red-400 hover:bg-red-500 rounded-full text-white" onClick={() => handleDeleteQuiz(quiz.id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="p-5 pb-8">
          <h2 className="font-semibold text-[11px]">{quiz.title}</h2>
          <span className="">{quiz.category}</span>
        </div>

        <div className="w-full h-full border-t-[1px] border-t-slate-200 flex p-2">
          <Link to={`/admin/manage-quiz/edit-quiz/${quiz.id}`} className="w-full h-full border-r-[1px] border-r-slate-200 flex items-center justify-center">
            <button type="button" id="edit-quiz-button" className="w-[90%] h-[40px] border-[1px] border-black rounded-full">
              Edit
            </button>
          </Link>

          <Link to={`/admin/view-quiz/${quiz.id}`} className="w-full h-full  flex items-center justify-center">
            <button type="button" id="view-quiz-button" className="w-[90%] h-[40px] border-[1px] border-black rounded-full">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
