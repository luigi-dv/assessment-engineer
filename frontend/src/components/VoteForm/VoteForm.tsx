import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { cn } from "src/utilities/cn";
import { Button } from "src/components/ui/button";
import * as React from "react";
import { useVoteForm } from "src/hooks/useVoteForm";
import { VoteCombobox } from "src/components/VoteCombobox";

const hardCodedOptions = [
  {
    label: "React",
    value: "react",
  },
  {
    label: "Vue",
    value: "vue",
  },
  {
    label: "Angular",
    value: "angular",
  },
];

export const VoteForm = ({ className }: React.ComponentProps<"form">) => {
  const { form, handleChange } = useVoteForm({
    username: "",
    voteId: "",
  });

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <VoteCombobox options={hardCodedOptions} />
      </div>
      <Button type="submit">Send Vote</Button>
    </form>
  );
};
