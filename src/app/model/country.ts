export interface Country {
  id?: string;
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
  latlng: number[];
  demonym: string;
  timezones: string;
  nativeName: string;
}
