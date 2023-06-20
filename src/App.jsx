import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import useFetchData from './hooks/useFetchData';

import Header from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';

import Home from './pages/Home/Home';
import OndeDescartar from './pages/OndeDescartar/OndeDescartar';
import Contato from './pages/Contato/Contato';
import Cadastro from './pages/Cadastro/Cadastro';
import EnvioConfirmado from './pages/EnvioConfirmado/EnvioConfirmado';
import PaginaNaoEncontrada from './pages/PaginaNaoEncontrada/PaginaNaoEncontrada';

function formatPhone(phoneDdd, phoneNumber) {
  if (!phoneDdd || !phoneNumber) return;
  return `(${phoneDdd}) ${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4, 8)}`;
}

function formatWhatsAppLink(phoneDdd, phoneNumber) {
  if (!phoneDdd || !phoneNumber) return;
  return `https://wa.me/${phoneDdd}${phoneNumber}`;
}

function formatPhoneLink(phoneDdi, phoneDdd, phoneNumber) {
  if (!phoneDdd || !phoneNumber) return;
  return `tel:+${phoneDdi}${phoneDdd}${phoneNumber}`;
}

/**
 * Get the URL to open the Google Maps app.
 * @link https://developers.google.com/maps/documentation/urls/get-started#directions-action
 */

function getMapsUrl(street, number, neighborhood, city, state, zipCode) {
  const url = new URL('https://www.google.com/maps/search/?api=1');
  url.searchParams.set('query', `${street}, ${number}, ${neighborhood}, ${city}, ${state}, ${zipCode}`);
  return url;
}

/**
 * Get the value of a query parameter.
 */

const getValueFromQueryParams = (key) => {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get(key);
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

const App = () => {
  const { data: companies } = useFetchData('/companies');
  const { data: categories } = useFetchData('/categories');

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userCoordinates, setUserCoordinates] = useState([]);
  const [userZipCode, setUserZipCode] = useState('');

  const [isSearched, setSearched] = useState(false);

  useEffect(() => {
    if (getValueFromQueryParams('categories')) {
      setSelectedCategories(getValueFromQueryParams('categories').split(',').map(Number));
    }

    if (getValueFromQueryParams('lat') && getValueFromQueryParams('lng')) {
      setUserCoordinates([parseFloat(getValueFromQueryParams('lat')), parseFloat(getValueFromQueryParams('lng'))]);
    }

    if (getValueFromQueryParams('zipCode')) {
      setUserZipCode(getValueFromQueryParams('zipCode'));
    }

    if (getValueFromQueryParams('categories') && getValueFromQueryParams('lat') && getValueFromQueryParams('lng')) {
      setSearched(true);
    }
  }, []);

  /**
   * Iterate over companies and categories to add new properties to each object.
   * After this, the data will be available in the components.
   */

  companies.map((company) => {
    const { phoneDdi, phoneDdd, phoneNumber, addressStreet, addressNumber, addressNeighborhood, city, state, zipCode } = company;

    company.phoneFormatted = formatPhone(phoneDdd, phoneNumber);
    company.phoneLink = formatPhoneLink(phoneDdi, phoneDdd, phoneNumber);
    company.whatsAppLink = formatWhatsAppLink(phoneDdd, phoneNumber);
    company.addressLink = getMapsUrl(addressStreet, addressNumber, addressNeighborhood, city, state, zipCode);
  });

  // useEffect(() => {
  //   companies.map((company) => {
  //     company.distance = calculateDistance([userCoordinates[0], userCoordinates[1]], [company.lat, company.lng]);
  //   });
  // }, []);

  return (
    <>
      <Header />
      <Routes>
        {/* prettier-ignore */}
        <Route exact path="/" element={
          <Home
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            userCoordinates={userCoordinates}
            setUserCoordinates={setUserCoordinates}
            userZipCode={userZipCode}
            setUserZipCode={setUserZipCode} />
          }
        />
        {/* prettier-ignore */}
        <Route exact path="/onde-descartar" element={
          <OndeDescartar
            companies={companies}
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            userCoordinates={userCoordinates}
            setUserCoordinates={setUserCoordinates}
            userZipCode={userZipCode}
            setUserZipCode={setUserZipCode}
            isSearched={isSearched} />
          }
        />
        <Route exact path="/contato" element={<Contato />} />
        <Route exact path="/cadastro-para-empresas" element={<Cadastro categories={categories} />} />
        <Route exact path="/envio-confirmado" element={<EnvioConfirmado />} />
        <Route path="/404" component={<PaginaNaoEncontrada />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
