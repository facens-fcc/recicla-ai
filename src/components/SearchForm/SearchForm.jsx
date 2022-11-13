import React, { useState, useEffect } from 'react';
import style from './SearchForm.module.css';

import categories from '../../data/categories.json';

const SearchForm = () => {
  const dropdownRef = React.useRef();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [zipCode, setZipCode] = useState('');
  const [isZipCodeValid, setZipCodeValid] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [isCategoryValid, setCategoryValid] = useState(false);

  /**
   * ============================================================================
   * Dropdown
   * ============================================================================
   */

  const handleDropdownClickOutside = ({ target }) => {
    if (dropdownRef.current && !dropdownRef.current.contains(target)) {
      setDropdownOpen(false);
    }
  };

  const handleDropdownEscape = ({ key }) => {
    if (key === 'Escape') {
      setDropdownOpen(false);
    }
  };

  const handleDropdownOpen = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    document.addEventListener('click', handleDropdownClickOutside);
    document.addEventListener('keydown', handleDropdownEscape);

    return () => {
      document.removeEventListener('click', handleDropdownClickOutside);
      document.removeEventListener('keydown', handleDropdownEscape);
    };
  }, [isDropdownOpen]);

  /**
   * ============================================================================
   * Checkbox
   * ============================================================================
   */

  const handleCheckboxChange = ({ target }) => {
    const { name, checked } = target;

    if (checked) {
      setSelectedCategory([...selectedCategory, name]);
    } else {
      setSelectedCategory(selectedCategory.filter((category) => category !== name));
    }
  };

  useEffect(() => {
    selectedCategory.length > 0 ? setCategoryValid(true) : setCategoryValid(false);
  }, [selectedCategory]);

  /**
   * ============================================================================
   * Zip code
   * ============================================================================
   */

  const handleZipCodeChange = ({ target }) => {
    const zipCodeMarked = target.value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');

    setZipCode(zipCodeMarked);
  };

  // Function to return full address or false if not found based on zip code using Google Maps API

  const validateZipCode = async (zipCode) => {
    const zipCodeValue = zipCode.replace(/\D/g, '');

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCodeValue}&key=AIzaSyDdE2m_2nAtfQN9CA3emww375xD5CELjiU`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        data.status === 'OK' ? setZipCodeValid(true) : setZipCodeValid(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    if (zipCode.length === 9) {
      validateZipCode(zipCode);
    } else {
      setZipCodeValid(false);
    }
  }, [zipCode]);

  /**
   * Submit
   */

  const handleSubmit = (event) => {
    event.preventDefault();
    validateZipCode(zipCode);

    if (isZipCodeValid && !isCategoryValid) {
      alert('Selecione pelo menos um tipo de resíduo.');
    }

    if (!isZipCodeValid && isCategoryValid) {
      alert('Digite um CEP válido.');
    }

    if (!isZipCodeValid && !isCategoryValid) {
      alert('Digite um CEP válido e selecione pelo menos um tipo de resíduo.');
    }

    if (isZipCodeValid && isCategoryValid) {
      window.location.href = `/resultados?zipCode=${zipCode}&category=${selectedCategory}`;
    }
  };

  return (
    <form className="form form--horizontal" action="/resultados" method="GET" onSubmit={handleSubmit}>
      <div className={style.field}>
        <label className={style.label} htmlFor="zipcode">
          Qual é a sua localização?
        </label>
        <input className={style.input} value={zipCode} onChange={handleZipCodeChange} type="text" name="zipcode" id="zipcode" placeholder="00000-000" minLength="9" maxLength="9" required />
      </div>

      <div className={`${style.field} ${style.dropdown}`} ref={dropdownRef}>
        <p className={style.label}>O que deseja descartar?</p>
        <button className={style.dropdownButton} type="button" aria-expanded={isDropdownOpen} aria-controls="dropdown-content" id="dropdown-button" onClick={handleDropdownOpen}>
          {selectedCategory.length > 0 ? `(${selectedCategory.length})` : ''} Selecione os tipos de resíduos
        </button>
        <div className={style.dropdownContent} aria-hidden={!isDropdownOpen} aria-labelledby="dropdown-button" id="dropdown-content" role="dialog">
          {categories.map(({ id, name, label }) => (
            <div key={id}>
              <input type="checkbox" name={name} id={id} onChange={handleCheckboxChange} />
              <label htmlFor={id}>{label}</label>
            </div>
          ))}
        </div>
      </div>

      <footer>
        <button className="button button--primary" type="submit">
          Buscar por locais
        </button>
      </footer>
    </form>
  );
};

export default SearchForm;
