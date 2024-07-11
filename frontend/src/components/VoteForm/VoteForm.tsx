import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";

export const VoteForm = () => {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          className="w-full"
          defaultValue="Gamer Gear Pro Controller"
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="description">Description</Label>
      </div>
    </div>
  );
};
