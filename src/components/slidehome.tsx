import React from "react";
import { Carousel } from "react-bootstrap";
import styles from "../../public/styles/Slidehome.module.css";

export const Slidehome: React.FC = () => {
  return (
    <>
      <ul id="slideshow" className={styles.cbslideshow}>
        <li>
          <span>Image 01</span>
          <div className={styles.caption}>
            <h3>Tout Compte Fait </h3>
            <p>L'application sur-mesure pour partager vos dépenses avec vos ami(e)s ou collaborateurs-trices.</p>
          </div>
        </li>

        <li>
          <span>Image 02</span>
          <div className={styles.caption}>
            <h3>Transactions sécurisées</h3>
            <p>Payez avec votre moyen de paiement favoris, de VISA à Paypal ou avec vos Cryptomonnaies.</p>
          </div>
        </li>

        <li>
          <span>Image 03</span>
          <div className={styles.caption}>
            <h3>Partage On-The-Go</h3>
            <p>
              Que vous soyez en vacance, au restaurant ou sur le point de mettre en route votre projet, vous pouvez répartir en
              seulement quelques clics les contributions financières.
            </p>
          </div>
        </li>

        <li>
          <span>Image 04</span>
          <div className={styles.caption}>
            <h3>Avancement en temps réel</h3>
            <p>Gardez un oeil sur l'état de vos investissements et remboursements et dormez sur vos deux oreilles.</p>
          </div>
        </li>

        <li>
          <span>Image 05</span>
          <div className={styles.caption}>
            <h3>Les bons comptes font les bons amis</h3>
            <blockquote>'Good accounts make good friends'</blockquote>
            <p>Tentez l'aventure avec nous dès maintenant via notre application !</p>
          </div>
        </li>

        <li>
          <span>Image 05</span>
        </li>
      </ul>
    </>
  );
};

export default Slidehome;
