import { useState, useEffect } from 'react';
import style from './OndeDescartar.module.css';

import Search from '../../components/Search/Search';
import Results from '../../components/Results/Results';

const OndeDescartar = ({ companies, categories, selectedCategories, setSelectedCategories, userCoordinates, setUserCoordinates, userZipCode, setUserZipCode, isSearched }) => {
  return (
    <main className="main">
      <section className={style.hero}>
        <div className="container">
          <h1 className="display display--medium">Onde descartar?</h1>
          <Search categories={categories} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} userCoordinates={userCoordinates} setUserCoordinates={setUserCoordinates} userZipCode={userZipCode} setUserZipCode={setUserZipCode} />
        </div>
      </section>
      <section className={style.archive}>
        <div className="container">
          {isSearched && <Results companies={companies} selectedCategories={selectedCategories} userCoordinates={userCoordinates} userZipCode={userZipCode} />}
          {!isSearched && <p className={style.archive__message}>Preencha o filtro e mostraremos os locais próximos a você!</p>}
        </div>
      </section>
    </main>
  );
};

export default OndeDescartar;
