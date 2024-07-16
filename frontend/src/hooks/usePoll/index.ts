import { useEffect, useState } from "react";
import { Poll } from "src/api/polls/types";
import { pollsService } from "src/api/polls/pollsService";

export const usePoll = (pollId: string) => {
  const [poll, setPoll] = useState<Poll | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPoll = async () => {
      setLoading(true);
      try {
        const poll = await pollsService.getPoll(pollId, true);
        setPoll(poll);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [pollId]);

  return { poll, loading };
};
