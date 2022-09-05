import React, { FC } from 'react';

import './features-section.scss';

const FeaturesSection: FC = () => (
  <>
    <div className="features">
      <div className="features__pic">
        <img
          src="https://img.freepik.com/free-vector/student-with-laptop-sitting-huge-books-library-male-character-studying-computer-flat-vector-illustration-online-education-knowledge-concept-banner-website-design-landing-web-page_74855-22550.jpg"
          alt="Learning words"
        />
      </div>
      <div className="features__text">
        <p>
          If you don&apos;t believe that learning a language might be a lot of fun, give a try to
          our application.
        </p>
        <ul className="features__items">
          <li>
            <span>Words are sorted into groups according to their difficulty</span>
          </li>
          <li>
            <span>Context examples and audio provided to every word</span>
          </li>
          <li>
            <span>Two entertaining games with different modes</span>
          </li>
          <li>
            <span>We support a mobile version: play as you go!</span>
          </li>
          <li>
            <span>It is absolutely free!</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="description">
      <h2 className="description__title">
        How It
        {' '}
        <span>Works?</span>
      </h2>
    </div>
  </>
);

export default FeaturesSection;
