import React, { FC } from 'react';

import './learned-badge.scss';

const LearnedBadge: FC = () => (
  <div className="learned-page-badge">
    <div className="learned-page-badge--blob">
      <div className="learned-page-badge--icon jiggle" />
    </div>
  </div>
);

export default LearnedBadge;
