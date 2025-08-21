type FormDataTypes = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
};

type RoomRowTypes = {
  id: number;
  name?: string;
  maxCapacity?: number;
  regularPrice: number;
  discount: number;
  image?: string;
};

export { type FormDataTypes, type RoomRowTypes };
