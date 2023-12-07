import Summary from "./Summary";
import { render, screen } from '@testing-library/react';

const QUESTIONS = [
    { text: 'Question 1', answers: ['OptionA', 'OptionB', 'OptionC', 'OptionD'] },
    { text: 'Question 2', answers: ['Option1', 'Option2', 'Option3', 'Option4'] },
    ];
describe('checking Summary Component', () => { 
    const userAnswers = ['OptionA', 'OptionB', null, 'OptionC', 'OptionD'];
test('check', () => { 
    const {getByText}=render(<Summary userAnswers={userAnswers}/>)
    expect(getByText('Quiz Completed!')).toBeInTheDocument();

   expect(getByAltText('Trophy icon')).toBeInTheDocument();
   
    expect(getByText('25% skipped')).toBeInTheDocument();
    expect(getByText('40% answered correctly')).toBeInTheDocument();
    expect(getByText('35% answered incorrectly')).toBeInTheDocument();

    QUESTIONS.forEach((question, index) => {
      expect(getByText(question.text)).toBeInTheDocument();
      expect(getByText(userAnswers[index] ?? 'Skipped')).toBeInTheDocument();
    }); 
 });
 });