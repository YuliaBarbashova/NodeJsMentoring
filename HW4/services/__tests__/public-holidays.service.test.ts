import axios from "axios";

import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "../public-holidays.service";
import { PUBLIC_HOLIDAYS_API_URL } from "../../config";
import {
  YEAR,
  INCORRECT_YEAR,
  COUNTRY,
  INCORRECT_COUNTRY,
  PUBLIC_HOLIDAYS_DATA,
  PUBLIC_HOLIDAYS_SHORTEN_DATA,
} from "../../mocks";

describe("public-holidays.service: ", () => {
  describe("getListOfPublicHolidays: get list of public holidays by year and country", () => {
    test("should return public holidays", async () => {
      // mock response from API
      jest
        .spyOn(axios, "get")
        .mockImplementation(() =>
          Promise.resolve({ data: PUBLIC_HOLIDAYS_DATA })
        );

      const response = await getListOfPublicHolidays(YEAR, COUNTRY);

      // expect that getListOfPublicHolidays() func returns updated API data
      expect(response).toEqual(PUBLIC_HOLIDAYS_SHORTEN_DATA);
    });

    test("should call API with proper arguments", async () => {
      // setup spy on axios.get() to check what args were passed to it
      const axiosGetSpy = jest
        .spyOn(axios, "get")
        .mockImplementation(() =>
          Promise.resolve({ data: PUBLIC_HOLIDAYS_DATA })
        );

      await getListOfPublicHolidays(YEAR, COUNTRY);
      // expect that axios.get() is called with proper args
      expect(axiosGetSpy).toHaveBeenCalledWith(
        `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${YEAR}/${COUNTRY}`
      );
    });

    test("should throw error if country provided is not supported", async () => {
      // expect that getGenderByName() returns rejected promise proper error
      await expect(
        getListOfPublicHolidays(YEAR, INCORRECT_COUNTRY)
      ).rejects.toThrow(
        new Error(
          `Country provided is not supported, received: ${INCORRECT_COUNTRY}`
        )
      );
    });

    test("should throw error if year provided is not supported", async () => {
      // expect that getGenderByName() returns rejected promise proper error
      await expect(
        getListOfPublicHolidays(INCORRECT_YEAR, COUNTRY)
      ).rejects.toThrow(
        new Error(`Year provided not the current, received: ${INCORRECT_YEAR}`)
      );
    });

    test("should return [] in case of error", async () => {
      // expect that getGenderByName() returns rejected promise proper error
      jest.spyOn(axios, "get").mockImplementation(() => Promise.reject());
      const response = await getListOfPublicHolidays(YEAR, COUNTRY);

      expect(response).toEqual([]);
    });
  });

  describe("checkIfTodayIsPublicHoliday: check if today is public holiday in current country", () => {
    test("should return true if today is public holiday", async () => {
      // mock response from API
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve({ status: 200 }));

      const response = await checkIfTodayIsPublicHoliday(COUNTRY);

      expect(response).toEqual(true);
    });

    test("should return false if today is not public holiday", async () => {
      // mock response from API
      jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve({ status: 204 }));

      const response = await checkIfTodayIsPublicHoliday(COUNTRY);

      expect(response).toEqual(false);
    });

    test("should call API with proper arguments", async () => {
      // setup spy on axios.get() to check what args were passed to it
      const axiosGetSpy = jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve({ status: 200 }));

      await checkIfTodayIsPublicHoliday(COUNTRY);
      // expect that axios.get() is called with proper args
      expect(axiosGetSpy).toHaveBeenCalledWith(
        `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${COUNTRY}`
      );
    });

    test("should return false in case of error", async () => {
      // expect that getGenderByName() returns rejected promise proper error
      jest.spyOn(axios, "get").mockImplementation(() => Promise.reject());
      const response = await checkIfTodayIsPublicHoliday(COUNTRY);

      expect(response).toEqual(false);
    });
  });

  describe("getNextPublicHolidays: get list of next public holidays by country", () => {
    test("should return public holidays", async () => {
      // mock response from API
      jest
        .spyOn(axios, "get")
        .mockImplementation(() =>
          Promise.resolve({ data: PUBLIC_HOLIDAYS_DATA })
        );

      const response = await getNextPublicHolidays(COUNTRY);

      // expect that getListOfPublicHolidays() func returns updated API data
      expect(response).toEqual(PUBLIC_HOLIDAYS_SHORTEN_DATA);
    });

    test("should call API with proper arguments", async () => {
      // setup spy on axios.get() to check what args were passed to it
      const axiosGetSpy = jest
        .spyOn(axios, "get")
        .mockImplementation(() =>
          Promise.resolve({ data: PUBLIC_HOLIDAYS_DATA })
        );

      await getNextPublicHolidays(COUNTRY);
      // expect that axios.get() is called with proper args
      expect(axiosGetSpy).toHaveBeenCalledWith(
        `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${COUNTRY}`
      );
    });

    test("should return [] in case of error", async () => {
      // expect that getGenderByName() returns rejected promise proper error
      jest.spyOn(axios, "get").mockImplementation(() => Promise.reject());
      const response = await getNextPublicHolidays(COUNTRY);

      expect(response).toEqual([]);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
