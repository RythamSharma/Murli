import React from 'react';
import Rhombus from '../components/images/294.gif';
import './Spinner.css'
function Spinner() {
  return (
    <div className='text-center spinner'>
      <img src={Rhombus} alt="loading" />
    </div>
  );
}

export default Spinner;
