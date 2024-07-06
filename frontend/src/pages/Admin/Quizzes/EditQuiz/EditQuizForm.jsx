import React, { useState, useEffect } from 'react';
import { IoCheckmark, IoTrashOutline } from 'react-icons/io5';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiX } from 'react-icons/bi';

const EditQuizForm = ({ quiz, onSaveUpdateQuiz }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title || '');
      setCategory(quiz.category || '');
      setQuestions(quiz.questions || [{ question: '', options: [''], correctAnswer: null, showOptions: true }]);
    }
  }, [quiz]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: [''], correctAnswer: null, showOptions: true }]);
  };

  const handleAddOption = (questionIndex) => {
    if (questions[questionIndex].options.length < 6) {
      const updatedQuestions = questions.map((question, i) => {
        if (i === questionIndex) {
          return { ...question, options: [...question.options, ''], showOptions: true };
        }
        return question;
      });

      setQuestions(updatedQuestions);
    }
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    const updatedQuestions = questions.map((question, qIndex) => {
      if (qIndex === questionIndex) {
        const updatedOptions = question.options.filter((_, oIndex) => oIndex !== optionIndex);
        let updatedCorrectAnswer = question.correctAnswer;
        if (question.correctAnswer === question.options[optionIndex]) {
          updatedCorrectAnswer = null;
        }
        return { ...question, options: updatedOptions, correctAnswer: updatedCorrectAnswer };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (e, questionIndex) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === questionIndex) {
        return { ...question, question: e.target.value };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const updatedQuestions = questions.map((question, qIndex) => {
      if (qIndex === questionIndex) {
        const updatedOptions = question.options.map((option, oIndex) => {
          if (oIndex === optionIndex) {
            return e.target.value;
          }
          return option;
        });
        return { ...question, options: updatedOptions };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleSetCorrectAnswer = (questionIndex, optionIndex) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === questionIndex) {
        let newCorrectAnswer = question.options[optionIndex];
        if (question.correctAnswer === newCorrectAnswer) {
          newCorrectAnswer = null;
        }
        return { ...question, correctAnswer: newCorrectAnswer };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (questionIndex) => {
    const updatedQuestions = questions.filter((_, i) => i !== questionIndex);
    setQuestions(updatedQuestions);
  };

  const handleToggleOptions = (questionIndex) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === questionIndex) {
        return { ...question, showOptions: !question.showOptions };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newQuiz = { title, category, questions };
    onSaveUpdateQuiz(newQuiz);
  };

  return (
    <form id="edit-quiz-form" className="relative w-full h-auto" onSubmit={handleSubmit}>
      <div id="wrapper" className="flex flex-col">
        <div id="input-container">
          <label>Title</label>
          <input id="title-input" type="text" placeholder="Enter title quiz..." value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div id="input-container">
          <label>Category</label>
          <select id="category-select" className="p-4" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="" disabled>
              Select category
            </option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Literature">Literature</option>
            <option value="Anime">Anime</option>
          </select>
        </div>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="w-full h-auto border-[1px] border-darkTheme-gray rounded-2xl mb-4">
            <div className="flex justify-between items-center border-b-[1px] border-b-darkTheme-gray gap-4 px-4">
              <div id="input-container" className="w-full">
                <label className="p-10">Q{questionIndex + 1}</label>
                <input id="question-input" type="text" placeholder="Your question..." value={question.question} onChange={(e) => handleQuestionChange(e, questionIndex)} />
              </div>
              <div className="flex justify-center items-center gap-4">
                <div className="w-[35px] h-[35px] border-[1px] text-[14px] border-darkTheme-gray rounded-xl flex justify-center items-center cursor-pointer hover:bg-darkTheme-gray" onClick={() => handleToggleOptions(questionIndex)}>
                  {question.showOptions ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                <div className="w-[35px] h-[35px] border-[1px] text-[14px] border-darkTheme-gray rounded-xl flex justify-center items-center cursor-pointer hover:bg-red-500" onClick={() => handleDeleteQuestion(questionIndex)}>
                  <IoTrashOutline />
                </div>
              </div>
            </div>
            {question.showOptions &&
              question.options.map((option, optionIndex) => (
                <div key={optionIndex} id="input-container" className="px-4 flex items-center gap-2">
                  <div
                    id="checklist-icon"
                    className={`w-[45px] h-[35px] border-[1px] border-darkTheme-gray rounded-xl flex justify-center items-center text-[13px] cursor-pointer ${question.correctAnswer === option ? 'bg-green-500' : ''}`}
                    onClick={() => handleSetCorrectAnswer(questionIndex, optionIndex)}
                  >
                    <IoCheckmark />
                  </div>
                  <input id="option-input" type="text" placeholder="Option text..." value={option} onChange={(e) => handleOptionChange(e, questionIndex, optionIndex)} />

                  <div
                    id="delete-option-button"
                    className="w-[45px] h-[35px] border-[1px] border-darkTheme-gray rounded-xl flex justify-center items-center text-[13px] cursor-pointer hover:bg-red-500"
                    onClick={() => handleDeleteOption(questionIndex, optionIndex)}
                  >
                    <BiX />
                  </div>
                </div>
              ))}
            {question.options.length < 6 && (
              <button type="button" id="add-option-button" className="w-[100px] h-[30px] bg-white text-darkTheme-primary rounded-xl flex justify-center items-center mx-4 my-3 gap-2" onClick={() => handleAddOption(questionIndex)}>
                <AiOutlinePlus />
                Add option
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-center items-center mt-6">
          <button type="button" id="add-question-button" className="w-[100px] h-[30px] bg-white text-darkTheme-primary rounded-xl flex justify-center items-center mx-4 my-3 gap-2" onClick={handleAddQuestion}>
            <AiOutlinePlus />
            Question
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditQuizForm;
