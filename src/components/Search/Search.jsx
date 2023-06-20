import { useState, useEffect } from 'react';
import style from './Search.module.css';

import siren from '../../assets/siren.svg';

import Button from '../Button/Button.jsx';
import Checkbox from '../Checkbox/Checkbox.jsx';
import Input from '../Input/Input.jsx';
import MultipleCheckbox from '../MultipleCheckbox/MultipleCheckbox.jsx';

const Search = ({ categories, selectedCategories, setSelectedCategories, userCoordinates, setUserCoordinates, userZipCode, setUserZipCode }) => {
  const [isZipCodeValid, setZipCodeValid] = useState();
  const [isCategorySelected, setCategorySelected] = useState();
  const [isFormValid, setFormValid] = useState();

  useEffect(() => {
    setCategorySelected(selectedCategories.length > 0);
  }, [selectedCategories]);

  useEffect(() => {
    userZipCode.length === 9 ? setZipCodeValid(true) : setZipCodeValid(false);
  }, [userZipCode]);

  useEffect(() => {
    isZipCodeValid && getCoordinatesFromZipCode(userZipCode);
  }, [isZipCodeValid]);

  /**
   * Get the coordinates from the zipCode.
   * Return the latitude and longitude of the zipCode.
   */

  const getCoordinatesFromZipCode = async (zipCode) => {
    const value = zipCode.replace(/\D/g, '');
    const api = `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=AIzaSyCDVRS2y-aVIXVmiyXnrCfg9ZiDBEiHQJM`;

    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        const coordinates = data.results[0].geometry.location;
        setUserCoordinates(coordinates);
        setZipCodeValid(true);
      })
      .catch((error) => {
        setZipCodeValid(false);
      });
  };

  /**
   * Get the label for the select component.
   * Change the label according to the number of selected categories.
   */

  const getSelectLabel = () => {
    if (selectedCategories.length === 0) {
      return 'Selecione';
    } else if (selectedCategories.length === 1) {
      return `(${selectedCategories.length}) Selecionado`;
    } else {
      return `(${selectedCategories.length}) Selecionados`;
    }
  };

  /**
   * Set input mask while the user is typing.
   * Only numbers are allowed. Expected format: 00000-000.
   * If the input is valid, set the zipCode state.
   */

  const handleZipCodeChange = ({ target }) => {
    const zipCode = target.value
      .replace(/\D/g, '') // Remove all non-digits.
      .replace(/(\d{5})(\d)/, '$1-$2'); // Add a hyphen after the fifth digit.
    setUserZipCode(zipCode);
  };

  /**
   * Add and remove category from selectedCategories array when clicking on the category.
   * If the category is already selected, remove it from the array.
   */

  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  /**
   * Validate the form data when clicking on the submit button.
   * If the form is valid, redirect to the results page and pass the form data as query params.
   */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isZipCodeValid || !isCategorySelected) {
      setFormValid(isZipCodeValid && isCategorySelected);
    }

    if (isZipCodeValid && isCategorySelected) {
      const zipcode = `zipCode=${userZipCode}`;
      const coordinates = `lat=${userCoordinates.lat}&lng=${userCoordinates.lng}`;
      const categories = `categories=${selectedCategories}`;

      const rediretUrl = `/onde-descartar?${zipcode}&${coordinates}&${categories}`;
      window.location.href = rediretUrl;
    }
  };

  return (
    <div className={style.search}>
      <div className={style.search__box}>
        <div className={style.search__content}>
          <h2 className="heading">Encontre pontos de coleta próximos a você:</h2>
        </div>
        <form className={style.search__form} onSubmit={handleSubmit} method="GET">
          <Input id="zipcode" className="input" label="Qual é a sua localização?" type="text" name="zipcode" value={userZipCode} onChange={handleZipCodeChange} placeholder="00000-000" minLength="9" maxLength="9" required />
          <MultipleCheckbox id="categories" label={getSelectLabel()}>
            {categories.map(({ id, label, icon }) => (
              <Checkbox key={id} id={id} label={label} icon={icon} checked={selectedCategories.includes(id)} onChange={() => handleCategoryChange(id)} />
            ))}
          </MultipleCheckbox>
          <footer>
            <Button variant="orange" type="submit">
              Pesquisar
            </Button>
            {isFormValid === false && (
              <ul className={style.search__errors__list}>
                {!isZipCodeValid && (
                  <li className={style.search__errors__item}>
                    <img className="icon" src={siren} alt="Ícone de erro" aria-hidden="true" />
                    Digite um CEP válido
                  </li>
                )}
                {!isCategorySelected && (
                  <li className={style.search__errors__item}>
                    <img className="icon" src={siren} alt="Ícone de erro" aria-hidden="true" />
                    Selecione o que deseja descartar
                  </li>
                )}
              </ul>
            )}
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Search;
