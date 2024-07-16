import React, { useState } from "react";
import { VoteFormState } from "src/types/VoteFormState";
import { toast } from "sonner";
import { votesService } from "../../api/votes/votesService";
import { Vote } from "src/api/votes/types";
import { VoteClass } from "../../api/votes/vote";

export const useVoteForm = (initialState: VoteFormState) => {
  const [form, setForm] = useState<VoteFormState>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleVoteSelectChange = (value: string) => {
    setForm({ ...form, vote: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, vote, pollId } = form;

    const newVote = new VoteClass(pollId, vote, username);

    try {
      await votesService.createVote(newVote);
    } catch (error) {
      toast.error("Vote has not been submitted", {
        description: "An error occurred while submitting the vote",
      });
      console.log(error);
    } finally {
      toast.success("Vote submitted!", {
        description: "Thank you for voting!",
      });
      setForm(initialState);
    }
  };

  return {
    form,
    handleChange,
    handleVoteSelectChange,
    handleSubmit,
  };
};
