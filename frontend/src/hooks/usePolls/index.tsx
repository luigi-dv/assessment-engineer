import { useEffect, useState } from "react";
import { Poll } from "src/api/polls/types";
import { pollsService } from "src/api/polls/pollsService";

export const usePolls = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPolls = async () => {
      setLoading(true);
      try {
        const polls = await pollsService.getPolls();
        setPolls(polls);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPolls();
  }, []);

  return { polls, loading };
};
