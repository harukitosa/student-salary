import {
  Box,
  Grid,
  Text,
  Center,
  List,
  ListItem,
  ListIcon,
  Flex,
  Spacer,
} from "@chakra-ui/layout";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useState } from "react";
import moment from "moment-timezone";
import data from "../../calendar.json";
import { Button } from "@chakra-ui/button";

interface Event {
  company_name: string;
  limit_date: string[];
  event_date: string[];
  link: string;
  type: string;
  title: string;
}

class CalendarState {
  pointday: moment.Moment;
  calendar: Calendar[];
  events: Event[];
  eventsMap: Map<String, Event[]>;

  getMonth(): number {
    return this.pointday.get("month") + 1;
  }

  addPointDay(): moment.Moment {
    return this.pointday.add(1, "month");
  }

  subPointDay(): moment.Moment {
    return this.pointday.subtract(1, "month");
  }

  getEvent(day: string): Event[] {
    const events = this.eventsMap.get(day);
    if (events === undefined) return [];
    return events;
  }

  constructor(event: Event[], pointday: moment.Moment) {
    this.pointday = pointday;
    this.calendar = getCalendar(this.pointday);
    this.events = event;
    this.eventsMap = new Map();
    this.events.map((item) => {
      item.event_date.map((date) => {
        const data = this.eventsMap.get(date);
        if (data === undefined) {
          this.eventsMap.set(date, [item]);
        } else {
          data.push(item);
          this.eventsMap.set(date, data);
        }
      });
      item.limit_date.map((date) => {
        const data = this.eventsMap.get(date);
        if (data === undefined) {
          this.eventsMap.set(date, [item]);
        } else {
          data.push(item);
          this.eventsMap.set(date, data);
        }
      });
    });
  }
}

export default function CalenderPage() {
  const [calendarState, setcalendarState] = useState(
    new CalendarState(data, moment.tz("Asiz/Tokyo"))
  );

  const isHoliday = (weekdays) => {
    if (weekdays === 6) return "blue";
    if (weekdays === 0) return "red";
    return "black";
  };

  return (
    <>
      <Center>
        <Box w="full" maxW="1000px" pt="2">
          <Text textAlign="center" fontWeight="bold" fontSize="xl">
            {calendarState.getMonth()}月
          </Text>
          <Flex>

          <Button
            onClick={() => {
              setcalendarState(
                new CalendarState(data, calendarState.subPointDay())
              );
            }}
          >
            Last
          </Button>
          <Spacer/>
          <Button
            onClick={() => {
              setcalendarState(
                new CalendarState(data, calendarState.addPointDay())
              );
            }}
          >
            Next
          </Button>
          </Flex>

          <Grid templateColumns="repeat(1, 1fr)" gap={1} mt="2">
            {calendarState.calendar.map((item, idx) => {
              return (
                <Box key={idx} borderBottom="1px" p="1">
                  <Text
                    textColor={isHoliday(item.weekdays)}
                    fontWeight={
                      item.month + 1 == calendarState.getMonth()
                        ? "normal"
                        : "hairline"
                    }
                    textAlign="left"
                  >
                    {item.day}
                  </Text>
                  <List spacing={3} py="2">
                    {calendarState.getEvent(item.today).map((item) => {
                      return (
                        <a href={item.link} key={item.link}>
                          <ListItem>
                            <ListIcon as={CheckCircleIcon} color="green.200" />
                            <Text as="span" color="blue.400" fontSize="18">
                              [{item.company_name}]
                            </Text>{" "}
                            {item.title}
                          </ListItem>
                        </a>
                      );
                    })}
                  </List>
                </Box>
              );
            })}
          </Grid>
        </Box>
      </Center>
    </>
  );
}

const getStartDate = (currentDate: moment.MomentInput) => {
  const date = moment(currentDate);
  date.startOf("month");
  const youbiNum = date.day();
  return date.subtract(youbiNum - 1, "days");
};

const getEndDate = (currentDate: moment.MomentInput) => {
  let date = moment(currentDate);
  date.endOf("month");
  const youbiNum = date.day();
  return date.add(6 - youbiNum + 1, "days");
};

interface Calendar {
  year: number;
  day: number;
  month: number;
  weekdays: number;
  today: string;
}

const getCalendar = (currentDate: moment.Moment) => {
  let startDate = getStartDate(currentDate);
  const endDate = getEndDate(currentDate);
  const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);
  let calendars: Calendar[] = [];
  for (let week = 0; week < weekNumber; week++) {
    for (let day = 0; day < 7; day++) {
      calendars.push({
        year: startDate.get("year"),
        day: startDate.get("date"),
        month: startDate.get("month"),
        weekdays: startDate.get("weekdays"),
        today: startDate.format("YYYY-MM-DD"),
      });
      startDate.add(1, "days");
    }
  }
  return calendars;
};
