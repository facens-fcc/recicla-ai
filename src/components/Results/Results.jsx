import React, { useState, useEffect } from 'react';
import style from './Results.module.css';

import Companies from '../../data/companies.json';
import Card from '../Card/Card';

const Results = ({ userSelectedCategories = [], userCoordinates }) => {
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState(Companies);
  const [coordinates, setCoordinates] = useState(userCoordinates);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    setCategories(userSelectedCategories);
    setCompanies(companiesWithDistance);
  }, []);

  useEffect(() => {
    setFilteredCompanies(filterCompaniesByCategory.sort((a, b) => a.address.distance - b.address.distance));
  }, [companies]);

  /**
   * Calculates the distance between two points in km using the Haversine formula.
   * @link https://www.movable-type.co.uk/scripts/latlong.html
   */

  const calculateDistance = (origin, destination) => {
    const toRad = (value) => (value * Math.PI) / 180; // Converts numeric degrees to radians
    const R = 6371; // Radius of the earth in km
    const dLat = toRad(destination[0] - origin[0]);
    const dLon = toRad(destination[1] - origin[1]);
    const lat1 = toRad(origin[0]);
    const lat2 = toRad(destination[0]);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };

  /**
   * Calculates the distance between the user and the company.
   * Sets the distance in the company address object.
   */

  const companiesWithDistance = companies.map((company) => {
    const companyCoordinates = [company.address.lat, company.address.lng];
    const distance = calculateDistance(userCoordinates, companyCoordinates);
    company.address.distance = distance;
    return company;
  });

  /**
   * Filters the companies by the selected categories.
   * If the company has at least one category in common with the selected categories, it's included in the filtered list.
   */

  const filterCompaniesByCategory = companies.filter((company) => {
    const companyCategories = company.categories;
    const matches = companyCategories.filter((category) => categories.includes(category));
    return matches.length > 0;
  });

  return (
    <>
      <p className={style.results__counter}>
        Encontramos{' '}
        <strong>
          {filteredCompanies.length} {filteredCompanies.length === 1 ? 'local' : 'locais'}
        </strong>{' '}
        próximos a você!
      </p>
      <ul className={style.results__list}>
        {filteredCompanies.map((company) => (
          <Card key={company.id} company={company} userCoordinates={coordinates} />
        ))}
      </ul>
    </>
  );
};

export default Results;
