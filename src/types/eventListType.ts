export interface EventImage {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

export interface EventVenue {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  location?: {
    longitude: string;
    latitude: string;
  };
  city?: {
    name: string;
  };
  state?: {
    name: string;
    stateCode: string;
  };
  country?: {
    name: string;
    countryCode: string;
  };
  address?: {
    line1: string;
  };
}

export interface TicketmasterEvent {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  info?: string;
  description?: string;
  images: EventImage[];
  dates: {
    start: {
      localDate: string;
      localTime: string;
      dateTime: string;
      dateTBD: boolean;
      dateTBA: boolean;
      timeTBA: boolean;
      noSpecificTime: boolean;
    };
    timezone: string;
    status: {
      code: string;
    };
    spanMultipleDays: boolean;
  };
  classifications?: {
    primary: boolean;
    segment: {
      id: string;
      name: string;
    };
    genre: {
      id: string;
      name: string;
    };
    subGenre: {
      id: string;
      name: string;
    };
  }[];
  _embedded?: {
    venues: EventVenue[];
  };
}
