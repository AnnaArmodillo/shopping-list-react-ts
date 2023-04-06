import { Main } from 'components/Main/Main';
import './App.scss';
import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { FC } from 'react';

const App: FC = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default App;
