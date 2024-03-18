import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "../public-holidays.service";

describe("Integration tests for API Nager.Date", () => {
  const year = new Date().getFullYear();
  const supportedCountry = "GB";

  test("getListOfPublicHolidays makes a successful request", async () => {
    const holidays = await getListOfPublicHolidays(year, supportedCountry);

    expect(holidays.length).toBeGreaterThanOrEqual(0);
  });

  test("checkIfTodayIsPublicHoliday makes a successful request", async () => {
    const isHoliday = await checkIfTodayIsPublicHoliday(supportedCountry);

    expect(isHoliday).toEqual(expect.any(Boolean));
  });

  test("getNextPublicHolidays makes a successful request", async () => {
    const nextHolidays = await getNextPublicHolidays(supportedCountry);

    expect(nextHolidays.length).toBeGreaterThanOrEqual(0);
  });
});
