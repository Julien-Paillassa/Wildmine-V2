import React from 'react';

const DisplayIssuesTitle = () => (
  <div
    className='grid grid-cols-7 text-xs sm:text-sm md:text-base p-4 bg-grey_light text-wildmine_black shadow-md rounded-t-lg font-bold mt-12 text-center'
  >
    <p>No du ticket</p>
    <p>Priorité</p>
    <p>Nom du ticket</p>
    <p>Projet</p>
    {/* <p className='hidden sm:block'>Description</p>
    <p className='block sm:hidden'>Descrip-<br/>tion</p> */}
    <p>Statut</p>
    <p>Assigné à</p>
    <p>Date</p>
  </div>
);

export default DisplayIssuesTitle;