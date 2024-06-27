import React from 'react';

const QuizCard = ({ id, quiz }) => {
  return (
    <div id="quiz-card" className="relative w-full h-[200px] bg-white shadow-lg border-[1px] border-gray rounded-xl">
      <div>
        <h2 id="quiz-title" className="">
          {quiz.title}
        </h2>
      </div>
    </div>
  );
};

export default QuizCard;
