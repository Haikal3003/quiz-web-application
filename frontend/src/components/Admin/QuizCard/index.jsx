import React, { useState } from 'react';
import { getColorByCategory } from '../../../utils/categoryColors';
import { BsX } from 'react-icons/bs';
import { BiDotsVertical } from 'react-icons/bi';
import { Link, useLocation, useParams } from 'react-router-dom';
import QuizService from '../../../services/QuizService';
import { IoTrashOutline, IoPencilOutline, IoEyeOutline } from 'react-icons/io5';

const QuizCard = ({ quiz, onDeleteQuizById }) => {
  const [showCardMenuOption, setShowCardMenuOption] = useState(false);
  const location = useLocation();

  const deletequiz = async (id) => {
    try {
      const deletedQuiz = await QuizService.deleteQuizById(id);
      onDeleteQuizById(id);

      console.log(deletedQuiz);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="quiz-card" className={`relative w-full auto ${getColorByCategory(quiz.category)} rounded-xl p-8`}>
      <div className="flex flex-col ">
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex justify-center items-center w-[40px] h-[40px] text-[15px] text-black  bg-white  rounded-full cursor-pointer" onClick={() => setShowCardMenuOption(!showCardMenuOption)}>
          {showCardMenuOption ? <BsX /> : <BiDotsVertical />}
        </div>
        <div>
          <h1 className="font-semibold text-[18px]">{quiz.title}</h1>
          <h3 className="font-normal text-[14px]">{quiz.category}</h3>
        </div>
      </div>

      {showCardMenuOption && (
        <div className="absolute right-24 top-1/2 -translate-y-1/2 flex gap-4 text-[15px]">
          <Link to={`${location.pathname}/preview-quiz/${quiz.id}`} type="button" className="w-[40px] h-[40px] rounded-full border-[1px] border-darkTheme-primary bg-white  text-black flex justify-center items-center">
            <IoEyeOutline />
          </Link>
          <Link to={`${location.pathname}/edit-quiz/${quiz.id}`} className="w-[40px] h-[40px] rounded-full border-[1px] border-darkTheme-primary bg-green-400  flex justify-center items-center">
            <IoPencilOutline />
          </Link>

          <button type="button" className="w-[40px] h-[40px] rounded-full border-[1px] border-darkTheme-primary bg-red-500  flex justify-center items-center" onClick={() => deletequiz(quiz.id)}>
            <IoTrashOutline />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
