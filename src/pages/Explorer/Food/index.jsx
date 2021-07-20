import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { fetchRandomApiFood } from '../../../services/recipesApi';

function ExploreFoods() {
  const [idMeal, setIdMeal] = useState('');

  useEffect(() => {
    const getId = async () => {
      const { idMeal: id } = await fetchRandomApiFood();
      setIdMeal(id);
    };
    getId();
  }, []);
  return (
    <>
      <Header title="Explorar Comidas" icon="false" />
      <main>
        <Link to="/explorar/comidas/ingredientes">
          <h2 data-testid="explore-by-ingredient">Por Ingredientes</h2>
        </Link>
        <Link to="/explorar/comidas/area">
          <h2 data-testid="explore-by-area">Por Local de Origem</h2>
        </Link>
        <Link to={ `/comidas/${idMeal}` }>
          <h2 data-testid="explore-surprise">Me Surpreenda!</h2>
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default ExploreFoods;
