import * as React from "react";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { cn } from "src/utilities/cn";
import { Button } from "src/components/ui/button";
import { useVoteForm } from "src/hooks/useVoteForm";
import { VoteSelect } from "src/components/VoteSelect";
import { VoteFormProps } from "src/types/VoteFormProps";

export const VoteForm = ({ className, poll }: VoteFormProps) => {
  const { form, handleChange, handleVoteSelectChange, handleSubmit } =
    useVoteForm({
      pollId: poll._id,
      username: "",
      vote: "",
    });

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>
      {poll.options && (
        <div className="grid gap-2">
          <VoteSelect
            name="vote"
            title={poll.question}
            placeholder={poll.question}
            value={form.vote}
            handleChange={handleVoteSelectChange}
            options={poll.options}
          />
        </div>
      )}
      <Button type="submit">Send Vote</Button>
    </form>
  );
};
