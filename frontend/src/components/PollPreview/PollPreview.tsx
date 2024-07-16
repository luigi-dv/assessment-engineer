"use client";

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "src/components/ui/chart";
import { VoteDrawerDialog } from "src/components/VoteDrawerDialog";
import { PollSkeleton } from "./PollSkeleton";
import { useVotes } from "src/hooks/useVotes";
import { Poll } from "../../api/polls/types";

export const PollPreview = ({ poll }: { poll: Poll }) => {
  const { votes, chartConfig, chartData, loading } = useVotes(poll._id);
  return loading || !poll ? (
    <PollSkeleton />
  ) : (
    <Card>
      <CardHeader>
        <CardTitle>{poll.question}</CardTitle>
        <CardDescription>{poll._id}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="option_id"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="votes"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="w-full">
        <VoteDrawerDialog pollId={poll._id} />
      </CardFooter>
    </Card>
  );
};
