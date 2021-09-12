import { workdata } from "../types/type";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

export const CircleChart = (props: { list: workdata[] }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="type"
            data={props.list}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};
