export default function detectUnitsFromBrowser(): Units {
  if (typeof window === 'undefined') {
    return getDefaultMetricUnits();
  }

  const language = navigator.language.toLowerCase();
  const useImperial = ['en-us', 'bs', 'bz', 'ky', 'lr', 'pw'].includes(language);

  return useImperial ? getImperialUnits() : getMetricUnits();
}

function getImperialUnits(): Units {
  return {
    temperature: 'f',
    windSpeed: 'mph',
    pressure: 'in',
    visibility: 'miles',
    precipitation: 'in',
  };
}

function getMetricUnits(): Units {
  return {
    temperature: 'c',
    windSpeed: 'kph',
    pressure: 'mb',
    visibility: 'km',
    precipitation: 'mm',
  };
}

function getDefaultMetricUnits(): Units {
  return getMetricUnits();
}
