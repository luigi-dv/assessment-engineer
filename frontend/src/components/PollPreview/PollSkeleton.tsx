import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const PollSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className={"h-6 w-full bg-gray-200"} />
        </CardTitle>
        <CardDescription>
          <Skeleton className={"h-6 w-full bg-gray-200"} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className={"h-1/2 w-full bg-gray-200"} />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <Skeleton className={"h-6 w-full bg-gray-200"} />
      </CardFooter>
    </Card>
  );
};
