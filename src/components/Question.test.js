import Question from "./Question";
import { fireEvent, render ,waitFor} from "@testing-library/react";

describe('testing',()=>{
   const questionText="what is the capital of france";
   const answers=["paris","berlin","london","madrid"];
   const onSelectAnswer=jest.fn();
   const onSkipAnswer=jest.fn();
    test('rendering of question and answer',()=>{
    const {getByText}=  render(<Question
       questionText={questionText}
       answers={answers}
      />);
      const question=getByText(questionText);
      expect(question).toBeInTheDocument();
      answers.map((answer)=>{
        const answerText=getByText(answer);
        expect(answerText).toBeInTheDocument();
      });
    });
    test ('matching answer',()=>{
      const {getByText}=render(<Question
        questionText={questionText}
        answers={answers}
        onSelectAnswer={onSelectAnswer}
        />);
        const answerToSelect=answers[0];
        const answerButton=getByText(answerToSelect);
        fireEvent.click(answerButton);
        expect(onSelectAnswer).toHaveBeenCalledWith(answerToSelect);
    });
    test('calls onSkipAnswer when time runs out', async () => {
      jest.useFakeTimers();
  
      render(
        <Question
          questionText={questionText}
          answers={answers}
          onSelectAnswer={onSelectAnswer}
          onSkipAnswer={onSkipAnswer}
        />
      );
      jest.advanceTimersByTime(10000);
  
      await waitFor(() => {
        expect(onSkipAnswer).toHaveBeenCalled();
      });
  
      jest.useRealTimers();
    });
});