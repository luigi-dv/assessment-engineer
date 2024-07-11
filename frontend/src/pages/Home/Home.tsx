import { Button } from "src/components/ui/button";
import { Card, CardContent, CardHeader } from "src/components/ui/card";
import { SVGProps } from "react";
import { usePolls } from "src/hooks/usePolls";
import { VoteDialog } from "src/components/VoteDialog";

export const HomePage = () => {
  const { polls, loading } = usePolls(true);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-gray-900 dark:text-gray-300 py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Polling App</h1>
        <Button variant="ghost" size="icon" className="rounded-full">
          <PlusIcon className="w-6 h-6" />
          <span className="sr-only">Create Poll</span>
        </Button>
      </header>
      <main className="flex-1 py-8 px-6">
        <section>
          <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-400">
            Active Polls
          </h2>
          <div className="grid gap-4">
            {polls.map((poll) => (
              <Card key={poll._id}>
                <CardHeader className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{poll.question}</h3>
                  <div className="text-muted-foreground">
                    <span className="font-medium">
                      {poll.votes && poll.votes.length
                        ? poll.votes.length
                        : "No"}
                    </span>{" "}
                    Votes
                  </div>
                </CardHeader>
                <CardContent className="flex justify-center py-4">
                  <VoteDialog pollId={poll._id} />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

function PlusIcon(props: SVGProps<any>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
