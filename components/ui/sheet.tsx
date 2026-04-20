"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetTitle = DialogPrimitive.Title;
const SheetDescription = DialogPrimitive.Description;

function SheetPortal(props: DialogPrimitive.DialogPortalProps) {
  return <DialogPrimitive.Portal {...props} />;
}

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-deep/80 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

type SheetContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
>;

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-y-0 right-0 z-50 h-full w-3/4 max-w-sm",
        "bg-card border-l border-border shadow-2xl",
        "p-6 flex flex-col gap-6",
        "transition-transform duration-200 ease-out",
        "data-[state=closed]:translate-x-full data-[state=open]:translate-x-0",
        className,
      )}
      {...props}
    >
      <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>
      {children}
      <DialogPrimitive.Close
        className="absolute right-4 top-4 rounded-sm opacity-70 link-gold focus:outline-none focus:ring-2 focus:ring-gold-glow"
        aria-label="Close menu"
      >
        <X size={22} strokeWidth={1.75} />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = "SheetContent";

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetDescription,
};
