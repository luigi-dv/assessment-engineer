import { useEffect, useState } from "react";
import { Poll } from "src/api/polls/types";
import { pollsService } from "src/api/polls/pollsService";

export const usePolls = (extendedPolls?: boolean) => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPolls = async () => {
      setLoading(true);
      const polls = await pollsService.getPolls(Boolean(extendedPolls));
      setPolls(polls);
      setLoading(false);
    };

    fetchPolls();
  }, []);

  return { polls, loading };
};
