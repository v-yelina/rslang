import React, { FC } from 'react';
import avatar from '../../../../assets/images/avatar.png';

import './team-section.scss';

const TeamSection: FC = () => (
  <div className="team-section">
    <h2 className="team-section--title">Our Team</h2>
    <div className="team-members--wrapper">
      <div className="team-member--card">
        <div className="team-member--pic">
          <img src={avatar} alt="Team member" />
        </div>
        <div className="team-member--name">Valiantsina Yelina</div>
        <div className="team-member--desc">blabla</div>
      </div>
      <div className="team-member--card">
        <div className="team-member--pic">
          <img src={avatar} alt="Team member" />
        </div>
        <div className="team-member--name">Nina Sitaeva</div>
        <div className="team-member--desc">blabla</div>
      </div>
      <div className="team-member--card">
        <div className="team-member--pic">
          <img src={avatar} alt="Team member" />
        </div>
        <div className="team-member--name">Artem Smirnov</div>
        <div className="team-member--desc">blabla</div>
      </div>
    </div>
  </div>
);

export default TeamSection;
