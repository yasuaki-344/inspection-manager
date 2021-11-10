import { toCamelCase, toSnakeCase } from "../JsonKeyNameConverter";

it("convert camel case correctly", () => {
  const data = {
    first_attribute: 1,
    second_attribute: "test",
    third_attribute: [1, 2, 3],
  };
  const actual = toCamelCase(data);
  expect(actual).toEqual({
    firstAttribute: 1,
    secondAttribute: "test",
    thirdAttribute: [1, 2, 3],
  });
});

it("convert snake case correctly", () => {
  const data = {
    firstAttribute: 1,
    secondAttribute: "test",
    thirdAttribute: [1, 2, 3],
  };
  const actual = toSnakeCase(data);
  expect(actual).toEqual({
    first_attribute: 1,
    second_attribute: "test",
    third_attribute: [1, 2, 3],
  });
});
