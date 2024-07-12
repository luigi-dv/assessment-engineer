import React, { useState } from "react";
import { VoteFormState } from "src/types/VoteFormState";

export const useVoteForm = (initialState: VoteFormState) => {
  const [form, setForm] = useState<VoteFormState>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
  };

  return {
    form,
    handleChange,
    handleSubmit,
  };
};
