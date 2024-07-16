import * as React from "react";
import { Poll } from "src/api/polls/types";

export interface VoteFormProps extends React.ComponentProps<"form"> {
  poll: Poll;
}
