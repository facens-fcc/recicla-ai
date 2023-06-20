import { useEffect, useState } from 'react';
import style from './Results.module.css';
import Card from '../Card/Card.jsx';

/**
 * Get the length of the companies array.
 * Return the total number of companies with the label in the plural or singular.
 */

const getTotalResults = (companies) => {
  const total = companies.length;
  const plural = total !== 1;
  return `${total} ${plural ? 'locais' : 'local'}`;
};

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

const Results = ({ companies, selectedCategories, userCoordinates, userZipCode }) => {
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const companiesFiltered = companies.filter((company) => {
      return company.categories.some((category) => selectedCategories.includes(category.id));
    });

    const companiesWithDistance = companiesFiltered.map((company) => {
      return {
        ...company,
        distance: calculateDistance([userCoordinates.lat, userCoordinates.lng], [company.lat, company.lng]),
      };
    });

    setFilteredCompanies(companiesWithDistance.sort((a, b) => a.distance - b.distance));
    setLoading(false);
  }, [companies]);

  return (
    <div className={style.results}>
      <div className={style.resultsCounter}>
        {loading ? (
          // prettier-ignore
          <p>Carregando..</p>
        ) : (
          // prettier-ignore
          <p>Encontramos <strong>{getTotalResults(filteredCompanies)}</strong> próximos a você!</p>
        )}
      </div>
      <ul className={style.resultsList}>
        {filteredCompanies.map((company) => (
          <Card key={company.id} company={company} />
        ))}
      </ul>
    </div>
  );
};

export default Results;
