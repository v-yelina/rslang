import React, { FC, useEffect, useRef } from 'react';
import Typed from 'typed.js';

import './intro-section.scss';

const IntroSection: FC = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el!.current!, {
      strings: ['in a month', 'without motivation', 'more effective'],
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 100,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="intro">
      <div className="intro__text">
        <p>Have you ever wished that learning a language would be at least a bit easier?</p>
        <p>Did you feel overwhelmed by memorizing tons of new words? </p>
        <p>Are you looking for the best approach to learning English?</p>
        <p>Well, you’ve come to the right place.</p>
      </div>
      <div className="intro__code-block-wrapper">
        <div className="intro__code-block">
          <div className="intro__code-block--menu">
            <div className="code-block__btn" />
            <div className="code-block__btn" />
            <div className="code-block__btn" />
          </div>
          <div className="code-block__screen">
            <span>{'> How to learn English '}</span>
            <span ref={el} className="intro__code-block--changing" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
