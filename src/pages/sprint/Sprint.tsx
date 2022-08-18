import React, { FC } from 'react';
import Timer from '../../components/timer';

const Sprint: FC = () => (
  <section className="sprint">
    <div className="sprint__header">
      <Timer />
    </div>
    <div className="sprint__field" />
  </section>
);

export default Sprint;
