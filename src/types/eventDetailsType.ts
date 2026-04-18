export interface TicketmasterEventResponse {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: Image[];
  sales: Sales;
  dates: Dates;
  classifications: Classification[];
  promoter: Promoter;
  promoters: Promoter[];
  info: string;
  pleaseNote: string;
  seatmap: Seatmap;
  accessibility: Accessibility;
  ticketLimit: TicketLimit;
  ageRestrictions: AgeRestrictions;
  ticketing: Ticketing;
  nameOrigin: string;
  linkMoreInfo: LinkMoreInfo;
  _links: RootLinks;
  _embedded: Embedded;
}

interface Image {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

interface Sales {
  public: PublicSale;
  presales: Presale[];
}

interface PublicSale {
  startDateTime: string;
  startTBD: boolean;
  startTBA: boolean;
  endDateTime: string;
}

interface Presale {
  startDateTime: string;
  endDateTime: string;
  name: string;
}

interface Dates {
  start: StartDate;
  timezone: string;
  status: Status;
  spanMultipleDays: boolean;
}

interface StartDate {
  localDate: string;
  localTime: string;
  dateTime: string;
  dateTBD: boolean;
  dateTBA: boolean;
  timeTBA: boolean;
  noSpecificTime: boolean;
}

interface Status {
  code: string;
}

interface Classification {
  primary: boolean;
  segment: GenreItem;
  genre: GenreItem;
  subGenre: GenreItem;
  type: GenreItem;
  subType: GenreItem;
  family: boolean;
}

interface GenreItem {
  id: string;
  name: string;
}

interface Promoter {
  id: string;
  name: string;
  description: string;
}

interface Seatmap {
  staticUrl: string;
}

interface Accessibility {
  ticketLimit: number;
}

interface TicketLimit {
  info: string;
}

interface AgeRestrictions {
  legalAgeEnforced: boolean;
}

interface Ticketing {
  safeTix: EnabledFlag;
  allInclusivePricing: EnabledFlag;
}

interface EnabledFlag {
  enabled: boolean;
}

interface LinkMoreInfo {
  descriptions: Record<string, string>;
  url: string;
}

interface RootLinks {
  self: HrefItem;
  attractions: HrefItem[];
  venues: HrefItem[];
}

interface HrefItem {
  href: string;
}

interface Embedded {
  venues: Venue[];
  attractions: Attraction[];
}

interface Venue {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: Image[];
  postalCode: string;
  timezone: string;
  city: NamedValue;
  state: State;
  country: Country;
  address: Address;
  location: Coordinates;
  markets: NamedValueWithId[];
  dmas: Dma[];
  boxOfficeInfo: BoxOfficeInfo;
  parkingDetail: string;
  accessibleSeatingDetail: string;
  generalInfo: GeneralInfo;
  upcomingEvents: UpcomingEvents;
  _links: {
    self: HrefItem;
  };
}

interface NamedValue {
  name: string;
}

interface State extends NamedValue {
  stateCode: string;
}

interface Country extends NamedValue {
  countryCode: string;
}

interface Address {
  line1: string;
}

interface Coordinates {
  longitude: string;
  latitude: string;
}

interface NamedValueWithId extends NamedValue {
  id: string;
}

interface Dma {
  id: number;
}

interface BoxOfficeInfo {
  phoneNumberDetail: string;
  openHoursDetail: string;
  acceptedPaymentDetail: string;
  willCallDetail: string;
}

interface GeneralInfo {
  generalRule: string;
  childRule: string;
}

interface UpcomingEvents {
  ticketmaster: number;
  _total: number;
  _filtered: number;
}

interface Attraction {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  externalLinks: ExternalLinks;
  aliases?: string[];
  images: Image[];
  classifications: Classification[];
  upcomingEvents: UpcomingEvents;
  _links: {
    self: HrefItem;
  };
}

interface ExternalLinks {
  twitter?: SocialLink[];
  facebook?: SocialLink[];
  wiki?: SocialLink[];
  instagram?: SocialLink[];
  homepage?: SocialLink[];
}

interface SocialLink {
  url: string;
}
