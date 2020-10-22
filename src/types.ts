type Location = {
  name: string;
  url: string;
};

type Origin = {
  name: string;
  url: string;
};
export interface IDetails {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  episode: [string];
  image: string;
  id: number;
}
