import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { ReactNode } from "react";
import { Button } from "./ui/button";

interface IProps {
  children: ReactNode;
  onDelete: () => void;
  title?: string;
  description?: string;
}

const AskConfirmation = ({
  children,
  onDelete,
  title,
  description,
}: IProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title ? title : "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ? description : "This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={onDelete}>
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AskConfirmation;
