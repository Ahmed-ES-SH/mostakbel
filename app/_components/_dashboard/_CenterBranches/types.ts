export type Location = {
  lat: number;
  lng: number;
  address: string;
};

export type Branch = {
  id: number;
  email: string;
  phone: string;
  location: Location;
  created_at: string;
  updated_at: string;
};
