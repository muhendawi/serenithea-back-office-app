type SettingsFormTypes = {
  id: number;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};

type FieldType = {
  [key: string]: number;
};

export { type SettingsFormTypes, type FieldType };
