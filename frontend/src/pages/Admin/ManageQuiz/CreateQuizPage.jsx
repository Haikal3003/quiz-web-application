import React from 'react';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import CreateQuizForm from './CreateQuizForm';
import QuizService from '../../../services/QuizService';
import { toastSuccess } from '../../../utils/Toast';

const CreateQuizPage = () => {
  const navigate = useNavigate();

  const handleSaveQuiz = async (newQuiz) => {
    try {
      const savedQuiz = await QuizService.createQuiz(newQuiz);
      toastSuccess('Quiz created successfully!');
      console.log(savedQuiz);
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <section id="create-quiz-page">
      <div className="flex items-center gap-8">
        <div id="back-icon" className="w-[40px] h-[40px] flex justify-center items-center text-[15px] border-[1px] border-gray rounded-md hover:bg-black hover:text-white transition cursor-pointer" onClick={() => navigate(-1)}>
          <IoReturnUpBackOutline />
        </div>
        <h1 className="text-[17px] font-semibold">Create Quiz</h1>
      </div>

      <div className="my-[25px]">
        <CreateQuizForm onSaveQuiz={handleSaveQuiz} />
      </div>
    </section>
  );
};

export default CreateQuizPage;
