import * as React from "react";

import { useMediaQuery } from "src/hooks/useMediaQuery";
import { Button } from "src/components/ui/button";
import { VoteForm } from "src/components/VoteForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "src/components/ui/drawer";
import { VoteDrawerDialogProps } from "src/types/VoteDrawerDialogProps";
import { usePoll } from "src/hooks/usePoll";
import { Loader2 } from "lucide-react";

export const VoteDrawerDialog = ({ pollId }: VoteDrawerDialogProps) => {
  const { poll, loading } = usePoll(pollId);

  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full"
            disabled={!poll || loading}
          >
            {loading && <Loader2 size="24" className="mr-2 animate-spin" />}
            {!loading && poll ? "Vote" : "Poll have not been set up yet."}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="capitalize">{poll?.question}</DialogTitle>
            <DialogDescription>
              Select your vote here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {!loading && poll ? <VoteForm poll={poll} /> : <div>Loading...</div>}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          {loading ? (
            <Loader2 size="24" className="mr-2 animate-spin" />
          ) : (
            "Vote"
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="text-left">
            <DrawerTitle>Voting</DrawerTitle>
            <DrawerDescription>
              Select your vote here. Click save when you're done.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {loading && <div>Loading...</div>}
            {!loading && poll && <VoteForm poll={poll} />}
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
