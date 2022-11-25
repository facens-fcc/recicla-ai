import React, { useState, useEffect } from 'react';
import { Loader } from 'google-maps';

const Distance = ({ origin, destination }) => {
  const [distance, setDistance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loader = new Loader('AIzaSyDdE2m_2nAtfQN9CA3emww375xD5CELjiU');

    loader.load().then((google) => {
      const service = new google.maps.DistanceMatrixService();

      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === google.maps.DistanceMatrixStatus.OK) {
            setDistance(response.rows[0].elements[0].distance.value);
            setLoading(false);
          } else {
            setError(true);
            setLoading(false);
          }
        },
      );
    });
  }, [origin, destination]);

  if (loading) {
    return <div>Calculando distância...</div>;
  }

  if (error) {
    return <div>Erro ao calcular distância</div>;
  }

  return <div>{distance < 1000 ? <div>{distance} meters</div> : <div>{(distance / 1000).toFixed(2)} km</div>}</div>;
};

export default Distance;
