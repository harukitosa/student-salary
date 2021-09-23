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
  Stack,
  Badge,
} from "@chakra-ui/layout";
import {
  ExternalLinkIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";
import { useState } from "react";
import moment from "moment-timezone";
import data from "../../calendar.json";
import { IconButton } from "@chakra-ui/button";
import { SEO } from "../../component/seo";
import { ShareButton } from "../../component/shareButton";

interface Event {
  company_name: string;
  limit_date: string[];
  event_date: string[];
  link: string;
  type: string;
  title: string;
  dateType?: "limit" | "event";
}

class CalendarState {
  pointday: moment.Moment;
  calendar: Calendar[];
  events: Event[];
  eventsMap: Map<String, Event[]>;

  getMonth(): number {
    return this.pointday.get("month") + 1;
  }

  getYear(): number {
    return this.pointday.get("year");
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
          this.eventsMap.set(date, [
            {
              ...item,
              dateType: "event",
            },
          ]);
        } else {
          data.push({
            ...item,
            dateType: "event",
          });
          this.eventsMap.set(date, data);
        }
      });
      item.limit_date.map((date) => {
        const data = this.eventsMap.get(date);
        if (data === undefined) {
          this.eventsMap.set(date, [
            {
              ...item,
              dateType: "limit",
            },
          ]);
        } else {
          data.push({
            ...item,
            dateType: "limit",
          });
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
      <SEO
        title={`エンジニアインターンシップ・新卒採用カレンダー`}
        description={`エンジニア向け、インターンシップや新卒採用予定をカレンダーとして一覧で閲覧することができます。`}
        imageText={`エンジニアインターンシップ・新卒採用カレンダー`}
      />
      <Center>
        <Box w="full" maxW="1000px" pt="2">
          <Flex>
            <IconButton
              aria-label="last month"
              icon={<ChevronLeftIcon />}
              onClick={() => {
                setcalendarState(
                  new CalendarState(data, calendarState.subPointDay())
                );
              }}
            >
              Last
            </IconButton>
            <Spacer />
            <Text textAlign="center" fontWeight="bold" fontSize="2xl">
              {calendarState.getYear()}年 {calendarState.getMonth()}月
            </Text>
            <Spacer />
            <IconButton
              aria-label="next month"
              icon={<ChevronRightIcon />}
              onClick={() => {
                setcalendarState(
                  new CalendarState(data, calendarState.addPointDay())
                );
              }}
            >
              Next
            </IconButton>
          </Flex>

          <Box py="8">
            情報は不正確な場合があります。必ず、参照先のリンクをご確認ください。
          </Box>

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
                      return <EventListItem key={item.link} item={item} />;
                    })}
                  </List>
                </Box>
              );
            })}
          </Grid>

          <Flex pt="20">
            <IconButton
              aria-label="last month"
              icon={<ChevronLeftIcon />}
              onClick={() => {
                setcalendarState(
                  new CalendarState(data, calendarState.subPointDay())
                );
              }}
            >
              Last
            </IconButton>
            <Spacer />
            <IconButton
              aria-label="next month"
              icon={<ChevronRightIcon />}
              onClick={() => {
                setcalendarState(
                  new CalendarState(data, calendarState.addPointDay())
                );
              }}
            >
              Next
            </IconButton>
          </Flex>

          <ShareButton
            title="エンジニアインターンシップ・新卒採用カレンダー"
            url="https://www.student-salary.com/calendar"
          />
        </Box>
      </Center>
    </>
  );
}

const EventListItem = (props: { item: Event }) => {
  return (
    <a href={props.item.link} target="_blank" rel="noreferrer">
      <ListItem mb="4">
        <Stack>
          <Box>
            {props.item.dateType === "event" ? (
              <Badge variant="outline" colorScheme="blue">
                開催日
              </Badge>
            ) : (
              ""
            )}
            {props.item.dateType === "limit" ? (
              <Badge variant="outline" colorScheme="red">
                応募締め切り日
              </Badge>
            ) : (
              ""
            )}{" "}
            {props.item.type === "intern" ? (
              <Badge variant="outline" colorScheme="blue">
                インターン
              </Badge>
            ) : (
              ""
            )}
            {props.item.type === "recruit" ? (
              <Badge variant="outline" colorScheme="orange">
                新卒採用
              </Badge>
            ) : (
              ""
            )}
          </Box>
          <Box>
            <Text as="span">
              {props.item.title} - {props.item.company_name}
            </Text>
            <ListIcon as={ExternalLinkIcon} color="black" w={4} h={4} />
          </Box>
        </Stack>
      </ListItem>
    </a>
  );
};

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
