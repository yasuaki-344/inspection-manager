import camelCase from "lodash.camelcase";
import snakeCase from "lodash.snakecase";

export const toCamelCase = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((innerData: any) => toCamelCase(innerData));
  }
  const keys = Object.keys(data);
  if (keys.length > 0) {
    const r: { [key: string]: any } = {};
    keys.forEach((key: string) => {
      if (Array.isArray(data[key])) {
        r[camelCase(key)] = toCamelCase(data[key]);
      } else {
        r[camelCase(key)] = data[key];
      }
    });
    return r;
  }
  return data;
};

export const toSnakeCase = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((innerData: any) => toSnakeCase(innerData));
  }
  const keys = Object.keys(data);
  if (keys.length > 0) {
    const r: { [key: string]: any } = {};
    keys.forEach((key: string) => {
      if (Array.isArray(data[key])) {
        r[snakeCase(key)] = toSnakeCase(data[key]);
      } else {
        r[snakeCase(key)] = data[key];
      }
    });
    return r;
  }
  return data;
};
