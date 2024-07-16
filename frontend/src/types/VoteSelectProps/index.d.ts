import { Option } from "src/api/options/types";

export interface VoteSelectProps {
  title: string;
  value: string;
  placeholder: string;
  name: string;
  handleChange: (e: string) => void;
  options: Option[];
}
