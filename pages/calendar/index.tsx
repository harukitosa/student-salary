import { Box, Grid, Text } from "@chakra-ui/layout";
import { useState } from "react";
import moment from "moment-timezone";

export default function CalenderPage() {
  const [calendar, setcalendar] = useState(getCalendar());

  const isHoliday = (weekdays) => {
    if (weekdays === 6) return "blue";
    if (weekdays === 0) return "red";
    return "black";
  };

  const month = moment.tz("Asia/Tokyo").get("month") + 1;

  return (
    <Box w="full" pt="2">
      <Text textAlign="center" fontWeight="bold" fontSize="xl">
        {month}月
      </Text>
      <Grid templateColumns="repeat(7, 1fr)" gap={1} mt="2">
        {calendar.map((item, idx) => {
          return (
            <Box key={idx} borderBottom="2px" h="24" p="1">
              <Text
                textColor={isHoliday(item.value)}
                fontWeight={item.month + 1 == month ? "normal" : "hairline"}
                textAlign="center"
              >
                {item.day}
              </Text>
            </Box>
          );
        })}
      </Grid>
    </Box>
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

const getCalendar = () => {
  let startDate = getStartDate(moment.tz("Asia/Tokyo"));
  const endDate = getEndDate(moment.tz("Asia/Tokyo"));
  const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);
  let calendars: any[] = [];
  for (let week = 0; week < weekNumber; week++) {
    for (let day = 0; day < 7; day++) {
      calendars.push({
        day: startDate.get("date"),
        month: startDate.get("month"),
        value: startDate.get("weekdays"),
      });
      startDate.add(1, "days");
    }
  }
  return calendars;
};
