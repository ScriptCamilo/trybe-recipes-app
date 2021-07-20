import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  GiHotMeal,
  GiMartini,
  GiStarSattelites,
  // GiBooze,
  // GiGlassCelebration,
  // GiWineBottle,
  // GiWineGlass,
  // GiCompass,
  // GiOrbital,
  // GiRadarSweep,
} from 'react-icons/gi';

// martini, save, radar

// import drinkIcon from '../../images/drinkIcon.svg';
// import exploreIcon from '../../images/exploreIcon.svg';
// import mealIcon from '../../images/mealIcon.svg';

import styles from './footer.module.scss';

function Footer() {
  return (
    <footer className={ styles.footer } data-testid="footer">
      <NavLink strict to="/bebidas" activeClassName={ styles.navBarLink }>
        {/* <img
          alt="Drinks"
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
        /> */}
        <GiMartini size="3rem" />
      </NavLink>
      <NavLink strict to="/explorar" activeClassName={ styles.navBarLink }>
        {/* <img
          alt="Explorar"
          src={ exploreIcon }
          data-testid="explore-bottom-btn"
        /> */}
        <GiStarSattelites size="3rem" />
      </NavLink>
      <NavLink strict to="/comidas" activeClassName={ styles.navBarLink }>
        {/* <img
          alt="Comidas"
          src={ mealIcon }
          data-testid="food-bottom-btn"
        /> */}
        <GiHotMeal size="3rem" />
      </NavLink>
    </footer>
  );
}

export default Footer;
