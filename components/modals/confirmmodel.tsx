"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface ConfirmDeleteOptions {
  children: React.ReactNode;
  onConfirm: () => void;
}

export const ConfirmDelete = ({
  children,
  onConfirm,
}: ConfirmDeleteOptions) => {
  const handelConfirm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onConfirm();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handelConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDelete;
