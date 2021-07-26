import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchRandomApiDrink } from '../../../services/recipesApi';
import styles from '../explorer.module.scss';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

function ExploreDrinks() {
  const [idDrink, setIdDrink] = useState('');

  useEffect(() => {
    const getId = async () => {
      const { idDrink: id } = await fetchRandomApiDrink();
      setIdDrink(id);
    };
    getId();
  }, []);

  return (
    <div>
      <Header title="Explorar Bebidas" icon="false" />
      <main className={ styles.explorer }>
        <Link to="/explorar/bebidas/ingredientes">
          <h2 data-testid="explore-by-ingredient">Por Ingredientes</h2>
        </Link>
        <Link to={ `/bebidas/${idDrink}` }>
          <h2 data-testid="explore-surprise">Me Surpreenda!</h2>
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
