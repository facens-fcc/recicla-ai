import React, { useState, useEffect } from 'react';
import style from './Search.module.css';

import Checkbox from '../Checkbox/Checkbox';
import Heading from '../Heading/Heading';

import categories from '../../data/categories.json';
import siren from '../../assets/siren.svg';

const Search = ({ userZipCode = '', userSelectedCategories = [] }) => {
  const dropdownRef = React.useRef();
  const dropdownButtonRef = React.useRef();
  const zipCodeRef = React.useRef();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [zipCode, setZipCode] = useState(userZipCode);
  const [isZipCodeValid, setZipCodeValid] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState(userSelectedCategories);
  const [isCategoryValid, setCategoryValid] = useState(false);

  const [isFormValid, setFormValid] = useState();

  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    document.addEventListener('click', handleDropdownClickOutside);
    document.addEventListener('keydown', handleDropdownEscape);

    return () => {
      document.removeEventListener('click', handleDropdownClickOutside);
      document.removeEventListener('keydown', handleDropdownEscape);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    selectedCategories.length > 0 ? setCategoryValid(true) : setCategoryValid(false);
  }, [selectedCategories]);

  useEffect(() => {
    zipCode.length === 9 ? setZipCodeValid(true) : setZipCodeValid(false);
  }, [zipCode]);

  useEffect(() => {
    isZipCodeValid && getAdressData(zipCode);
  }, [isZipCodeValid]);

  /**
   * Dropdown
   *  • Open/close dropdown,
   *  • Close dropdown when clicking outside or pressing escape.
   *  • Update label according to the length of the selected categories.
   */

  const handleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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

  const handleDropdownLabel = () => {
    if (selectedCategories.length === 0) return 'Selecione';
    if (selectedCategories.length === 1) return `(${selectedCategories.length}) Selecionado`;
    if (selectedCategories.length > 1) return `(${selectedCategories.length}) Selecionados`;
  };

  /**
   * Add and remove category from selectedCategories array when clicking on the category.
   * If the category is already selected, remove it from the array.
   */

  const handleCheckboxChange = ({ target }) => {
    const { name, checked } = target;

    if (checked) {
      setSelectedCategories([...selectedCategories, name]);
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== name));
    }
  };

  /**
   * Mark the checkbox as checked with the selectedCategories array.
   */

  useEffect(() => {
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      userSelectedCategories.includes(checkbox.name) && (checkbox.checked = true);
    });
  }, []);

  /**
   * Set input mask while the user is typing.
   * Only numbers are allowed. Expected format: 00000-000.
   * If the input is valid, set the zipCode state.
   */

  const handleZipCodeChange = ({ target }) => {
    const zipCode = target.value
      .replace(/\D/g, '') // Remove all non-digits.
      .replace(/(\d{5})(\d)/, '$1-$2') // Add a hyphen after the fifth digit.
      .replace(/(-\d{3})\d+?$/, '$1'); // Limit to 9 digits.

    setZipCode(zipCode);
  };

  /**
   * Validate if the zipCode is valid through the Google Maps API.
   * If the zipCode is valid, set the address and coordinates states.
   */

  const getAdressData = async (zipCode) => {
    const zipCodeValue = zipCode.replace(/\D/g, '');

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCodeValue}&key=AIzaSyDdE2m_2nAtfQN9CA3emww375xD5CELjiU`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'OK') {
          setZipCodeValid(true);
          setCoordinates(data.results[0].geometry.location);
        } else {
          setZipCodeValid(false);
          setCoordinates(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Validate the form data when clicking on the submit button.
   * If the form is valid, redirect to the results page and pass the form data as query params.
   */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isZipCodeValid && !isCategoryValid) {
      setFormValid(false);
      dropdownButtonRef.current.focus();
    }

    if ((!isZipCodeValid && isCategoryValid) || (!isZipCodeValid && !isCategoryValid)) {
      setFormValid(false);
      zipCodeRef.current.focus();
    }

    if (isZipCodeValid && isCategoryValid) {
      setFormValid(true);
      window.location.href = `/onde-descartar?zipCode=${zipCode}&lat=${coordinates.lat}&lng=${coordinates.lng}&categories=${selectedCategories}`;
    }
  };

  return (
    <div className={style.search}>
      <div className={style.search__box}>
        <div className={style.search__content}>
          <Heading level="h2">Encontre pontos de coleta próximos a você:</Heading>
        </div>
        <form className={style.search__form} method="GET" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="zipcode">
              Qual é a sua localização?
            </label>
            <input className="input" value={zipCode} onChange={handleZipCodeChange} type="text" name="zipcode" id="zipcode" placeholder="00000-000" minLength="9" maxLength="9" required ref={zipCodeRef} />
          </div>

          <div className="field" ref={dropdownRef}>
            <p className="label">O que deseja descartar?</p>
            <button className="dropdownButton" type="button" aria-expanded={isDropdownOpen} aria-controls="dropdown-content" id="dropdown-button" onClick={handleDropdown} ref={dropdownButtonRef}>
              {handleDropdownLabel()}
            </button>
            <div className="dropdownContent" aria-hidden={!isDropdownOpen} aria-labelledby="dropdown-button" id="dropdown-content" role="dialog">
              {categories.map(({ id, label }) => (
                <Checkbox key={id} id={id} label={label} name={label} onChange={handleCheckboxChange} />
              ))}
            </div>
          </div>
          <footer>
            <button className="button button--primary" type="submit">
              Pesquisar
            </button>
            <div role="alert" aria-live="assertive" aria-atomic="true" className={style.search__errors}>
              {isFormValid === false && (
                <ul className={style.search__errors__list}>
                  {!isZipCodeValid && (
                    <li className={style.search__errors__item}>
                      <img className="icon" src={siren} alt="Ícone de erro" aria-hidden="true" />
                      Digite um CEP válido
                    </li>
                  )}
                  {!isCategoryValid && (
                    <li className={style.search__errors__item}>
                      <img className="icon" src={siren} alt="Ícone de erro" aria-hidden="true" />
                      Selecione o que deseja descartar
                    </li>
                  )}
                </ul>
              )}
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Search;
