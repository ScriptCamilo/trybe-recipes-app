import React from 'react';
import { Link } from 'react-router-dom';

import styles from './explorer.module.scss';

import Header from '../../components/Header';
import Footer from '../../components/Footer/index';

function Explorer() {
  return (
    <div>
      <Header title="Explorar" icon="false" />
      <main className={ styles.explorer }>
        <Link to="/explorar/comidas">
          <h2 data-testid="explore-food">Explorar Comidas</h2>
        </Link>
        <Link to="/explorar/bebidas">
          <h2 data-testid="explore-drinks">Explorar Bebidas</h2>
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default Explorer;
