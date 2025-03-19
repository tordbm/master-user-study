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
    question: 'Which list has more news articles that you find appealing?',
    options: defaultOptions,
  },
  {
    question:
      'Which list has more news articles that might be among the best news articles you see in the next year?',
    options: defaultOptions,
  },
  {
    question:
      'Which list has more obviously bad news article recommendations for you?',
    options: defaultOptions,
  },
  {
    question:
      'Which list does a better job of putting better news articles at the top?',
    options: defaultOptions,
  },
  {
    question:
      'Which list has more news articles that are similar to each other?',
    options: defaultOptions,
  },
  {
    question: 'Which list has a more varied selection of news articles?',
    options: defaultOptions,
  },
  {
    question:
      'Which list has news articles that match a wider variety of your news preference?',
    options: defaultOptions,
  },
  {
    question: 'Which list would suit a broader set of tastes?',
    options: defaultOptions,
  },
  {
    question: 'Which list better understands your taste in news articles?',
    options: defaultOptions,
  },
  {
    question:
      'Which list would you trust more to provide you with recommendations?',
    options: defaultOptions,
  },
  {
    question:
      'Which list seems more personalized to your news article preference?',
    options: defaultOptions,
  },
  {
    question:
      'Which list more represents mainstream tastes instead of your own?',
    options: defaultOptions,
  },
  {
    question: 'Which list would better help you find news articles to read?',
    options: defaultOptions,
  },
  {
    question: 'Which list is on the left?',
    options: defaultOptions,
  },
  {
    question:
      'Which list would you be more likely to recommend to your friends?',
    options: defaultOptions,
  },
  {
    question: 'Which list of recommendations do you find more valuable?',
    options: defaultOptions,
  },
  {
    question:
      'Which list would you rather have as an app on your mobile phone?',
    options: defaultOptions,
  },
  {
    question:
      'Which list would better help to pick satisfactory news articles?',
    options: defaultOptions,
  },
  {
    question: 'Which list has more news articles you do not expect?',
    options: defaultOptions,
  },
  {
    question: 'Which list has more news articles that are familiar to you?',
    options: defaultOptions,
  },
  {
    question: 'Which list has more pleasantly surprising news articles?',
    options: defaultOptions,
  },
  {
    question:
      'Which list has more news articles you would not have thought to consider?',
    options: defaultOptions,
  },
  {
    question: 'Which list provides fewer new suggestions?',
    options: defaultOptions,
  },
]
