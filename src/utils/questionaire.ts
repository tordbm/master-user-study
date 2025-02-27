enum Options {
  LIST1 = 'LIST1',
  UNSURE = 'UNSURE',
  LIST2 = 'LIST2',
  YES = 'YES',
  NO = 'NO',
}

const defaultOptions = [
  { value: Options.LIST1, text: 'List 1' },
  { value: Options.UNSURE, text: 'Unsure' },
  { value: Options.LIST2, text: 'List 2' },
]

const yesNoOptions = [
  { value: Options.YES, text: 'Yes' },
  { value: Options.UNSURE, text: 'Unsure' },
  { value: Options.NO, text: 'No' },
]

export const questions = [
  {
    qaId: 'qa',
    question: 'Which list gives you the best first impression?',
    options: defaultOptions,
  },
  {
    qaId: 'qa',
    question: 'Which list has more articles you find appealing?',
    options: defaultOptions,
  },
  {
    qaId: 'qa',
    question: 'Which list has the more obviously bad recommendations for you?',
    options: defaultOptions,
  },
  {
    qaId: 'qa',
    question:
      'Which recommender does a better job of putting more relevant articles at the top?',
    options: defaultOptions,
  },
  {
    qaId: 'qa',
    question: 'Which list has more articles that are similar to each other?',
    options: defaultOptions,
  },
  {
    qaId: 'qa',
    question: 'Which list has a wider variety of articles?',
    options: defaultOptions,
  },
  {
    qaId: 'qa',
    question: 'Which recommender better understands your prefrence in sports?',
    options: defaultOptions,
  },
  {
    qaId: 'qa',
    question: 'List 1 is on the left',
    options: yesNoOptions,
  },
  {
    qaId: 'qa',
    question:
      'Which recommender would you trust more to give you sports recommendations?',
    options: defaultOptions,
  },
]
