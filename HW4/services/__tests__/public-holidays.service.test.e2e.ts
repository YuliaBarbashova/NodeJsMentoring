import request from "supertest";
import "jest-extended";

import { PUBLIC_HOLIDAYS_API_URL } from "../../config";
import {
  YEAR,
  INCORRECT_YEAR,
  COUNTRY,
  INCORRECT_COUNTRY
} from "../../mocks";
import { PublicHoliday } from "../../types";

describe("API Nager.Date", () => {
  describe("/PublicHolidays", () => {
    test("should return 200 and list of public holiday", async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/PublicHolidays/${YEAR}/${COUNTRY}`
      );

      expect(status).toEqual(200);
      body.forEach((holiday: PublicHoliday) =>
        expect(holiday).toEqual({
          date: expect.any(String),
          localName: expect.any(String),
          name: expect.any(String),
          countryCode: expect.any(String),
          fixed: expect.any(Boolean),
          global: expect.any(Boolean),
          counties: expect.toBeOneOf([expect.any(Array), null]),
          launchYear: expect.toBeOneOf([expect.any(Number), null]),
          types: expect.any(Array),
        })
      );
    });

    test("should return 404 if CountryCode is unknown", async () => {
      const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/PublicHolidays/${YEAR}/${INCORRECT_COUNTRY}`
      );

      expect(status).toEqual(404);
    });

    test("should return 400 if year is incorrect", async () => {
      const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/PublicHolidays/${INCORRECT_YEAR}/${COUNTRY}`
      );

      expect(status).toEqual(400);
    });
  });

  describe("/IsTodayPublicHoliday", () => {
    test("should return 200 and list of public holiday", async () => {
      const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/IsTodayPublicHoliday/${COUNTRY}`
      );

      expect(status).toEqual(expect.toBeOneOf([200, 204]));
    });

    test("should return 404 if CountryCode is unknown", async () => {
      const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/IsTodayPublicHoliday/${INCORRECT_COUNTRY}`
      );

      expect(status).toEqual(404);
    });
  });

  describe("/NextPublicHolidays", () => {
    test("should return 200 and list of next public holiday", async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/NextPublicHolidays/${COUNTRY}`
      );

      expect(status).toEqual(200);
      body.forEach((holiday: PublicHoliday) =>
        expect(holiday).toEqual({
          date: expect.any(String),
          localName: expect.any(String),
          name: expect.any(String),
          countryCode: expect.any(String),
          fixed: expect.any(Boolean),
          global: expect.any(Boolean),
          counties: expect.toBeOneOf([expect.any(Array), null]),
          launchYear: expect.toBeOneOf([expect.any(Number), null]),
          types: expect.any(Array),
        })
      );
    });

    test("should return 500 if CountryCode is unknown", async () => {
      const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/NextPublicHolidays/${INCORRECT_COUNTRY}`
      );

      expect(status).toEqual(500);
    });
  });
});
