import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { addNewItem } from 'redux/slices/itemsSlice';
import styles from './newItemForm.module.scss';
import { newItemValidationScheme } from './validator';

export const NewItemForm = () => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        title: '',
        cost: '',
      }}
      validationSchema={newItemValidationScheme}
      onSubmit={(values, { resetForm }) => {
        dispatch(addNewItem(values.title, values.cost));
        resetForm();
      }}
    >
      {(formik) => {
        const { isValid, dirty } = formik;
        return (
          <Form className={styles.form}>
            <div className={styles.fieldWrapper}>
              <Field
                className={styles.field}
                type="text"
                name="title"
                placeholder="наименование"
                autocomplete="off"
              />
              <ErrorMessage className={styles.error} name="title" component="div" />
            </div>
            <div className={styles.fieldWrapper}>
              <Field
                className={styles.field}
                type="text"
                name="cost"
                placeholder="стоимость"
                autocomplete="off"
              />
              <ErrorMessage className={styles.error} name="cost" component="div" />
            </div>
            <button className={styles.button} type="submit" disabled={!isValid || !dirty}>
              Добавить
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
