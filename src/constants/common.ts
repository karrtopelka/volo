export const LANGUAGES = [
  { title: 'Українська', code: 'uk' },
  { title: 'English', code: 'en' },
]

export const USER_ROLES = [
  { labelUk: 'Волонтер', labelEn: 'Volunteer', value: 'VOLUNTEER' },
  { labelUk: 'Жертводавець', labelEn: 'Donor', value: 'DONOR' },
  { labelUk: 'Військовослужбовець', labelEn: 'Military', value: 'MILITARY' },
  { labelUk: 'Біженець', labelEn: 'Refugee', value: 'REFUGEE' },
]

export const REQUEST_TYPES = [
  { labelUk: 'Фінансовий', labelEn: 'Financial', value: 'FINANCIAL' },
  { labelUk: 'Збір', labelEn: 'Collection', value: 'COLLECTION' },
  { labelUk: 'Матеріальний', labelEn: 'Material', value: 'MATERIAL' },
  { labelUk: 'Речі', labelEn: 'Things', value: 'THINGS' },
]

export const REQUEST_STATUSES = [
  { labelUk: 'Відкритий', labelEn: 'Open', value: 'OPEN' },
  { labelUk: 'В процесі', labelEn: 'In progress', value: 'IN_PROGRESS' },
  { labelUk: 'Завершений', labelEn: 'Completed', value: 'COMPLETED' },
  { labelUk: 'Закритий', labelEn: 'Closed', value: 'CLOSED' },
]

export const REQUEST_FROM_DATE = [
  {
    labelUk: '24 години',
    labelEn: '24 hours',
    value: new Date().setDate(new Date().getDate() - 1).toString(),
  },
  {
    labelUk: 'Останній тиждень',
    labelEn: 'Last week',
    value: new Date().setDate(new Date().getDate() - 7).toString(),
  },
  {
    labelUk: 'Останній місяць',
    labelEn: 'Last month',
    value: new Date().setMonth(new Date().getMonth() - 1).toString(),
  },
]
