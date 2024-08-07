import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const GEONAMES_USERNAME = 'waksfps'; // Replace with your Geonames username

interface Country {
  geonameId: string;
  countryName: string;
  countryCode: string;
}

interface State {
  geonameId: string;
  name: string;
  adminCode1: string;
}

interface City {
  geonameId: string;
  name: string;
}

interface Location {
  adminName1: string;
  placeName: string;
}

const fetchCountries = async (): Promise<Country[]> => {
  const { data } = await axios.get(`http://api.geonames.org/countryInfoJSON?username=${GEONAMES_USERNAME}`);
  return data.geonames || [];
};

const fetchStates = async (countryCode: string): Promise<State[]> => {
  const { data } = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${countryCode}&username=${GEONAMES_USERNAME}`);
  return data.geonames || [];
};

const fetchCities = async (stateCode: string): Promise<City[]> => {
  const { data } = await axios.get(`http://api.geonames.org/searchJSON?country=${stateCode}&username=${GEONAMES_USERNAME}`);
  return data.geonames || [];
};

const fetchLocationByPostalCode = async (postalCode: string): Promise<Location> => {
  const { data } = await axios.get(`http://api.geonames.org/postalCodeLookupJSON?postalcode=${postalCode}&username=${GEONAMES_USERNAME}`);
  return data.postalcodes[0] || { adminName1: '', placeName: '' };
};

export const useCountries = () => useQuery({
  queryKey: ['countries'],
  queryFn: fetchCountries
});

export const useStates = (countryCode: string) => useQuery({
  queryKey: ['states', countryCode],
  queryFn: () => fetchStates(countryCode),
  enabled: !!countryCode
});

export const useCities = (stateCode: string) => useQuery({
  queryKey: ['cities', stateCode],
  queryFn: () => fetchCities(stateCode),
  enabled: !!stateCode
});

export const useLocationByPostalCode = (postalCode: string) => useQuery({
  queryKey: ['location', postalCode],
  queryFn: () => fetchLocationByPostalCode(postalCode),
  enabled: !!postalCode
});
