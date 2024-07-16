import { useEffect, useState } from "react";
import { Vote } from "src/api/votes/types";
import { votesService } from "src/api/votes/votesService";
import { Poll } from "src/api/polls/types";
import { ChartConfig } from "../../components/ui/chart";
import { usePoll } from "../usePoll";
import { getRandomHexColor } from "../../utilities/colors";

export const useVotes = (pollId: string) => {
  const { poll, loading } = usePoll(pollId);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [chartData, setChartData] = useState<
    {
      option_id: string;
      label: string;
      votes: number;
      fill: string;
    }[]
  >([]);

  const [chartConfig, setChartConfig] = useState<any>({});

  const formatData = (votes: Vote[]) => {
    const data = votes.reduce(
      (acc, vote) => {
        const option = acc.find((item) => item.option_id === vote.option_id);
        if (option) {
          option.votes += 1;
        } else {
          acc.push({
            option_id: vote.option_id,
            label:
              poll?.options.find((option) => option._id === vote.option_id)
                ?.option_value ?? "",
            votes:
              acc.filter((item) => item.option_id === vote.option_id).length +
              1,
            fill: getRandomHexColor(),
          });
        }
        return acc;
      },
      [] as { option_id: string; label: string; votes: number; fill: string }[],
    );
    setChartData(data);
  };

  const generateChartConfig = (poll: Poll) => {
    let config = {
      votes: {
        label: "votes",
      },
    } satisfies ChartConfig;

    poll.options.forEach((option, index) => {
      config = {
        ...config,
        [option._id]: {
          label: option.option_value,
          color: `hsl(var(--chart-${index + 1}))`,
        },
      };
    });

    setChartConfig(config);
  };

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        if (poll) {
          generateChartConfig(poll);
          const votes = await votesService.getVotesForPoll(poll._id);
          setVotes(votes);
          formatData(votes);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchVotes();
  }, [poll]);

  return {
    votes,
    loading,
    chartData,
    chartConfig,
  };
};
