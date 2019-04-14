export interface CityResponseModel {
  id: number;
  name: string;
  country: string;
  coord: {
    lon: number;
    lat: number
  };
}
