import { add, format, sub } from 'date-fns';
import { displayDate } from '../date';

describe('displayDate utility', () => {
  it('correctly returns Today', () => {
    // get today's date
    const date = new Date();
    // when passed a date that is today, it should return "Today"
    expect(displayDate(date)).toBe('Today');
  });
  it('correctly returns Tomorrow', () => {
    // get tomorrow's date (today + 1 day)
    const date = add(new Date(), { days: 1 });
    // when passed a date that is tomorrow, it should return "Tomorrow"
    expect(displayDate(date)).toBe('Tomorrow');
  });
  it('correctly returns when date is in the past', () => {
    // get yesterday's date (today - 1 day)
    const date = sub(new Date(), { days: 1 });
    // by default, it should return a formatted string for past dates
    expect(displayDate(date, 'Schedule')).toBe(format(date, 'MM/dd/yyyy'));
    // default can be overwritten by a string
    expect(displayDate(date, 'Schedule', 'Past Due')).toBe('Past Due');
  });
  it('correctly returns if date is not specified', () => {
    // by default, it should return 'Schedule' if there is no date
    expect(displayDate()).toBe('Schedule');
    // the 'no date' message can be customized
    expect(displayDate(undefined, 'No Date')).toBe('No Date');
  });
  it('correctly returns a formatted date', () => {
    // set a date 1 week in the future
    const date = add(new Date(), { weeks: 1 });
    // the return value should be a formatted string
    expect(displayDate(date)).toBe(format(date, 'MM/dd/yyyy'));
  });
});
