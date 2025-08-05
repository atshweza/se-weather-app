'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          setError(err.message);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);
  return (
    <div className="">
      <main className="">
        {latitude && longitude ? (
          <p>
            Latitude: {latitude}, Longitude: {longitude}
          </p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <p>Loading location...</p>
        )}
      </main>
      <footer className=""></footer>
    </div>
  );
}
