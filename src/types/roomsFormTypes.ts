type FormDataTypes = {
  id?: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList | File | string;
};

export { type FormDataTypes };
