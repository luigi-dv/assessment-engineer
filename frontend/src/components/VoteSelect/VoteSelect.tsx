import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "src/components/ui/select";
import { VoteSelectProps } from "src/types/VoteSelectProps";

export const VoteSelect = ({
  title,
  value,
  placeholder,
  name,
  options,
  handleChange,
}: VoteSelectProps) => {
  return (
    <Select name={name} value={value} onValueChange={handleChange} required>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="capitalize">{title}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option._id} value={option._id}>
              {option.option_value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
