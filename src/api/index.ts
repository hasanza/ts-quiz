import { shuffleArray } from "../utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

//use the type from Questions and add answers proprty to it.
export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
export const fetchQuestions = async (
  amount: number,
  Difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${Difficulty}&type=multiple`;
  try {
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
      ...question,
      //put correct and incorrect answer in one array and shuffle the order.
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
  } catch (err) {
    console.log(err);
  }
};
