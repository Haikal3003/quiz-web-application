import React, { useEffect, useState } from 'react';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import CreateQuizForm from './CreateQuizForm';
import QuizService from '../../../services/QuizService';
import { toastSuccess } from '../../../utils/Toast';

const CreateQuizPage = () => {
  const [quizzes, setQuizzes] = useState(JSON.parse(localStorage.getItem('quizzes')) || []);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  const saveQuiz = async () => {
    if (!title || !category || questions.length < 5) {
      console.log('Failed to create quiz ( title, category, or minimum 5 questions requirement not met )');
      return;
    }

    const newQuiz = { title, category, questions };
    try {
      const savedQuiz = await QuizService.createQuiz(newQuiz);
      setQuizzes((prevQuiz) => [...prevQuiz, savedQuiz]);

      toastSuccess('Create quiz successfully');

      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddQuestion = () => {
    setQuestions((prevQuestion) => [...prevQuestion, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleDeleteQuestion = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(qIndex, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <section id="create-quiz-page">
      <div className="flex items-center gap-8">
        <div id="back-icon" className="w-[40px] h-[40px] flex justify-center items-center text-[15px] border-[1px] border-gray rounded-md hover:bg-black hover:text-white transition cursor-pointer" onClick={() => navigate(-1)}>
          <IoReturnUpBackOutline />
        </div>

        <h1 className="text-[17px] font-semibold">Create quiz</h1>
      </div>

      <div className="my-[25px]">
        <CreateQuizForm
          title={title}
          setTitle={setTitle}
          category={category}
          setCategory={setCategory}
          questions={questions}
          setQuestions={setQuestions}
          onAddQuestion={handleAddQuestion}
          onDeleteQuestion={handleDeleteQuestion}
          onSaveQuiz={saveQuiz}
        />
      </div>
    </section>
  );
};

export default CreateQuizPage;
