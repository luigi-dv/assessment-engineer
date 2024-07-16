import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
} from "src/components/ui/card";
import { SVGProps } from "react";
import { usePolls } from "src/hooks/usePolls";
import { Skeleton } from "src/components/ui/skeleton";
import { ScrollArea } from "src/components/ui/scroll-area";
import { PollPreview } from "src/components/PollPreview";
import { Button } from "src/components/ui/button";
import { PlusIcon, VoteIcon } from "lucide-react";
import { NewPollDialog } from "../../components/NewPollDialog";

export const HomePage = () => {
  const { polls, loading } = usePolls();
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8 px-6">
        <section>
          <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-400">
            Active Polls
          </h2>
          <ScrollArea className="h-screen">
            <div className="grid grid-cols-3 gap-4">
              {loading && (
                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <Skeleton className="h-6 w-[450px] bg-gray-200" />
                  </CardHeader>
                  <CardContent className="flex justify-center py-4">
                    <Skeleton className="h-4 w-[250px] bg-gray-200" />
                  </CardContent>
                </Card>
              )}
              {!loading && (
                <>
                  <Card className="bg-gray-100">
                    <CardHeader className="flex items-center justify-between">
                      <CardTitle>Create New Poll</CardTitle>
                      <CardDescription>
                        Start a new poll to gather feedback from your audience
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center py-4">
                      <div className="flex flex-col items-center gap-2">
                        <VoteIcon className="h-16 w-16 text-secondary-foreground" />
                        <div className="text-2xl font-light text-primary">
                          Create another poll
                        </div>
                        <div>
                          Check what people think about different topics
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <NewPollDialog />
                    </CardFooter>
                  </Card>
                  {polls.map((poll) => (
                    <PollPreview key={poll._id} poll={poll} />
                  ))}
                </>
              )}
            </div>
          </ScrollArea>
        </section>
      </main>
    </div>
  );
};
