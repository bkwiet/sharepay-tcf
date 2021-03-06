import React from "react";
import { Carousel } from "react-bootstrap";
import styles from "../../public/styles/Slideshow.module.css";

export const Slideshow: React.FC = () => {
  return (
    <Carousel className={styles.carousucre} controls={false} interval={3500}>
      <Carousel.Item>
        <img className="d-block w-100" src="/pictures/slideshow/slide_0.jpg" alt="First slide" />

        <Carousel.Caption className={styles.caption}>
          <img className={styles.logo} src="/pictures/brand_logo_mod.jpg" alt="" />
          <h3>Tout Compte Fait </h3>
          <p>L'application sur-mesure pour partager vos dépenses avec vos ami(e)s ou collaborateurs-trices.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src="/pictures/slideshow/slide_1.jpg" alt="second slide" />

        <Carousel.Caption className={styles.caption}>
          <h3>Transactions sécurisées</h3>
          <p>Payez avec votre moyen de paiement favoris, de VISA à Paypal ou avec vos Cryptomonnaies.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src="/pictures/slideshow/slide_2.jpg" alt="Fourth slide" />

        <Carousel.Caption className={styles.caption}>
          <h3>Partage On-The-Go</h3>
          <p>
            Que vous soyez en vacance, au restaurant ou sur le point de mettre en route votre projet, vous pouvez répartir en
            seulement quelques clics les contributions financières.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src="/pictures/slideshow/slide_4.jpg" alt="Fifth slide" />

        <Carousel.Caption className={styles.caption}>
          <h3>Avancement en temps réel</h3>
          <p>Gardez un oeil sur l'état de vos investissements et remboursements et dormez sur vos deux oreilles.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src="/pictures/slideshow/slide_5.jpg" alt="Sixth slide" />

        <Carousel.Caption className={styles.caption}>
          <h3>Les bons comptes font les bons amis</h3>
          <blockquote>'Good accounts make good friends'</blockquote>
          <p>Tentez l'aventure avec nous dès maintenant via notre application !</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slideshow;
