import * as Yup from 'yup';

export const newItemValidationScheme = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Наименование должно состоять минимум из двух символов')
    .max(20, 'Наименование должно содержать не более 20 символов')
    .required('Наименование является обязательным полем'),
  cost: Yup.number()
    .typeError('Стоимость должна быть положительным числом')
    .positive('Стоимость должна быть положительным числом')
    .required('Стоимость является обязательным полем'),
});
