import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import styles from './profile.module.scss';

function Profile() {
  function getEmail() {
    const data = JSON.parse(localStorage.getItem('user'));
    if (data) return data.email;
  }

  return (
    <>
      <Header title="Perfil" icon="false" />
      <main className={ styles.profileContainer }>
        <h2 data-testid="profile-email">{getEmail()}</h2>

        <Link
          to="/receitas-feitas"
          data-testid="profile-done-btn"
        >
          <h3>Receitas Feitas</h3>
        </Link>
        <Link
          to="/receitas-favoritas"
          data-testid="profile-favorite-btn"
        >
          <h3>Receitas Favoritas</h3>
        </Link>

        <Link
          className={ styles.logout }
          to="/"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          <h3>Sair</h3>
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
