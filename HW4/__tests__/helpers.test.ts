import { validateInput, shortenPublicHoliday } from "../helpers";
import { SUPPORTED_COUNTRIES } from "../config";
import {
  YEAR,
  INCORRECT_YEAR,
  COUNTRY,
  INCORRECT_COUNTRY,
  PUBLIC_HOLIDAYS_DATA,
  PUBLIC_HOLIDAYS_SHORTEN_DATA,
} from "../mocks";

describe("validateInput", () => {
  test("should return true if input is valid", () => {
    expect(validateInput({ year: YEAR, country: COUNTRY })).toEqual(true);
  });

  test("should throw error if country provided is not supported", async () => {
    expect(() =>
      validateInput({ year: YEAR, country: INCORRECT_COUNTRY })
    ).toThrow(
      new Error(
        `Country provided is not supported, received: ${INCORRECT_COUNTRY}`
      )
    );
  });

  test("should throw error if year provided is not correct", async () => {
    expect(() =>
      validateInput({ year: INCORRECT_YEAR, country: COUNTRY })
    ).toThrow(
      new Error(`Year provided not the current, received: ${INCORRECT_YEAR}`)
    );
  });

  test("should not throw error for supported countries", () => {
    SUPPORTED_COUNTRIES.forEach((country) => {
      expect(() => validateInput({ country })).not.toThrow();
    });
  });

  test("should not throw error if country and year are empty", () => {
    expect(() => validateInput({})).not.toThrow();
  });
});

describe("shortenPublicHoliday", () => {
  test("should return true if input is valid", () => {
    expect(shortenPublicHoliday(PUBLIC_HOLIDAYS_DATA[0])).toEqual(
      PUBLIC_HOLIDAYS_SHORTEN_DATA[0]
    );
  });
});
