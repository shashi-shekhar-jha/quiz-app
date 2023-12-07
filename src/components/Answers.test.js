import { fireEvent, render, screen } from '@testing-library/react';
import Answers from './Answers';


describe('Testing Answer Component',()=>{
const answers=['Paris','Berlin','London','Madrid'];
const selectedAnswer='Paris';
const answerState='answered';
const onSelect=jest.fn();  
    test('render answer options in random order',()=>{
       const {getByText}=render(
        <Answers answers={answers} selectedAnswer={selectedAnswer} answerState={answerState} onSelect={onSelect}/>
       );
       answers.forEach((answer)=>{
         expect(getByText(answer)).toBeInTheDocument();
       });
    });
    test('check if onSelect function is called',()=>{
       const {getByText}=render(<Answers
          answers={answers} selectedAnswer={selectedAnswer} answerState={answerState} onSelect={onSelect}
       />);
       const answerToSelect=getByText(answers[0]);
       fireEvent.click(answerToSelect);
       expect(onSelect).toHaveBeenCalledWith(answers[0]);
    });
    test('className when answerState is answered',()=>{
       const {getByText}=render(<Answers 
        answers={answers} selectedAnswer={selectedAnswer}
         answerState={answerState} onSelect={onSelect}
       />)
       const selectedAnswerButton=getByText(selectedAnswer);
         expect(selectedAnswerButton).toHaveClass('selected');
    });
    test('ClassName when answerState is correct ',()=>{
      const correctAnswerState = 'correct';
  
      const { getByText: getByTextCorrect } = render(
        <Answers answers={answers} selectedAnswer={selectedAnswer} answerState={correctAnswerState} onSelect={onSelect} />
      );
  
     
      const selectedAnswerButtonCorrect = getByTextCorrect(selectedAnswer);
    
  
      expect(selectedAnswerButtonCorrect).toHaveClass('correct');
   
    });
    test('ClassName when answerState is wrong ',()=>{
      const wrongAnswerState = 'wrong';
  
      const { getByText: getByTextWrong } = render(
        <Answers answers={answers} selectedAnswer={selectedAnswer} answerState={wrongAnswerState} onSelect={onSelect} />
      );
  
     
      const selectedAnswerButtonWrong = getByTextWrong(selectedAnswer);
    
  
      expect(selectedAnswerButtonWrong).toHaveClass('wrong');
   
    });
})