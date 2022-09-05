import React, { FC } from 'react';
import FeaturesSection from './components/features-section';
import IntroSection from './components/intro-section';

import './home.scss';

const Home: FC = () => (
  <section className="home-container">
    <IntroSection />
    <FeaturesSection />
    {/* <TeamSection /> */}
  </section>
);

export default Home;
