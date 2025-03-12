enum Options {
  LIST1 = 'LIST1',
  UNSURE = 'UNSURE',
  LIST2 = 'LIST2',
}

export enum AnswerOptions {
  TF_IDF = 'tf_idf',
  OPEN_AI = 'open_ai',
  S_BERT = 's_bert',
  UNSURE = 'unsure',
}

const defaultOptions = [
  { value: Options.LIST1, text: 'List 1' },
  { value: Options.UNSURE, text: 'Unsure' },
  { value: Options.LIST2, text: 'List 2' },
]

export const questions = [
  {
    question: 'Which list gives you the best first impression?',
    options: defaultOptions,
  },
  {
    question: 'Which list has more articles you find appealing?',
    options: defaultOptions,
  },
  {
    question: 'Which list has the more obviously bad recommendations for you?',
    options: defaultOptions,
  },
  {
    question:
      'Which list does a better job of putting more relevant articles at the top?',
    options: defaultOptions,
  },
  {
    question: 'Which list has more articles that are similar to each other?',
    options: defaultOptions,
  },
  {
    question: 'Which list has a wider variety of articles?',
    options: defaultOptions,
  },
  {
    question: 'Which list better understands your prefrence in sports?',
    options: defaultOptions,
  },
  {
    question: 'Which list is on the left?',
    options: defaultOptions,
  },
  {
    question:
      'Which list would you trust more to give you sports recommendations?',
    options: defaultOptions,
  },
  {
    question: 'Which list has more articles you did not expect?',
    options: defaultOptions,
  },
]
