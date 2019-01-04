import React from 'react';
import requireAuth from 'components/requireAuth';
import './Settings.css';

const Settings = () => {

  return (
    <section className="container--sm p-u-settings">
      <h1>Settings</h1>
    </section>
  );

}

export default requireAuth(Settings);
