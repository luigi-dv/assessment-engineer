import { Vote } from "src/api/votes/types";
import { Option } from "src/api/options/types";

export interface Poll {
  _id: string;
  question: string;
  options: Option[];
  votes: Vote[];
}
