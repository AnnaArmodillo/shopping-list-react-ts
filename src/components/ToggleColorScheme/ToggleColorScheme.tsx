import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeColorScheme, getLightColorSchemeSelector } from 'redux/slices/colorSchemeSlice';
import styles from './toggleColorScheme.module.scss';

export const ToggleColorScheme: FC = () => {
  const lightColorScheme = useSelector(getLightColorSchemeSelector);
  const dispatch = useDispatch();
  function changeColorSchemeHandler() {
    dispatch(changeColorScheme());
  }
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-color-scheme',
      lightColorScheme ? 'default' : 'dark',
    );
  }, [lightColorScheme]);
  return createPortal(
    <button
      type="button"
      id="button"
      className={styles.buttonToggleColor}
      onClick={changeColorSchemeHandler}
      title="поменять цветовую схему"
    >
      {lightColorScheme ? (
        <i className="fa-solid fa-toggle-on" />
      ) : (
        <i className="fa-solid fa-toggle-off" />
      )}
    </button>,
    document.getElementById('button')!,
  );
};
