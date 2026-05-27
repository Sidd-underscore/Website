"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ChevronsUpDown, CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";

const SelectContext = React.createContext(null);

function useSelectContext() {
  const context = React.useContext(SelectContext);

  if (!context) {
    throw new Error("Select components must be used within a Select root.");
  }

  return context;
}

function Select({ children, value: valueProp, defaultValue, onValueChange, ...props }) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const [selectedLabel, setSelectedLabel] = React.useState("");
  const [contentStyle, setContentStyle] = React.useState(null);
  const [triggerNode, setTriggerNode] = React.useState(null);
  const [contentNode, setContentNode] = React.useState(null);

  const value = valueProp ?? internalValue;

  const updatePosition = React.useCallback(() => {
    if (!triggerNode) return;

    const rect = triggerNode.getBoundingClientRect();

    setContentStyle({
      position: "fixed",
      top: `${rect.bottom + 8}px`,
      left: `${rect.left}px`,
      minWidth: `${rect.width}px`,
      zIndex: 9999,
    });
  }, [triggerNode]);

  const close = React.useCallback(() => setOpen(false), []);

  const selectValue = React.useCallback(
    (nextValue, label) => {
      if (valueProp === undefined) {
        setInternalValue(nextValue);
      }

      setSelectedLabel(label);
      onValueChange?.(nextValue);
      setOpen(false);
    },
    [onValueChange, valueProp],
  );

  React.useEffect(() => {
    if (!open) return;

    updatePosition();

    const handlePointerDown = (event) => {
      const target = event.target;

      if (
        triggerNode?.contains(target) ||
        contentNode?.contains(target)
      ) {
        return;
      }

      close();
    };

    const handlePosition = () => updatePosition();

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("resize", handlePosition);
    window.addEventListener("scroll", handlePosition, true);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("resize", handlePosition);
      window.removeEventListener("scroll", handlePosition, true);
    };
  }, [close, contentNode, open, triggerNode, updatePosition]);

  const context = {
    open,
    setOpen,
    value,
    selectedLabel,
    selectValue,
    setTriggerNode,
    setContentNode,
    contentStyle,
  };

  return (
    <SelectContext.Provider value={context}>
      <div data-slot="select" {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

function SelectGroup({ ...props }) {
  return <div data-slot="select-group" {...props} />;
}

function SelectValue({ placeholder, ...props }) {
  const context = useSelectContext();
  const hasValue = Boolean(context.selectedLabel || context.value);
  const displayValue = hasValue ? context.selectedLabel || context.value : placeholder || "";

  return (
    <span
      data-slot="select-value"
      className={cn(!hasValue && "text-black/50", props.className)}
      {...props}
    >
      {displayValue}
    </span>
  );
}

const SelectTrigger = React.forwardRef(function SelectTrigger(
  {
    className,
    children,
    triggerButtonVariant = "outline",
    ...props
  },
  forwardedRef,
) {
  const context = useSelectContext();
  const attachTriggerNode = React.useCallback(
    (node) => {
      context.setTriggerNode(node);

      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef, context],
  );

  return (
    <Button
      ref={attachTriggerNode}
      className={cn(
        "placeholder:text-black/50 flex h-9 w-full items-center justify-between px-3 py-2 text-sm whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-black/50 [&>span]:line-clamp-1",
        className,
      )}
      data-slot="select-trigger"
      variant={triggerButtonVariant}
      type="button"
      onClick={() => context.setOpen((current) => !current)}
      onKeyDown={(event) => {
        if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
          event.preventDefault();
          context.setOpen(true);
        }
        if (event.key === "Escape") {
          context.setOpen(false);
        }
      }}
      {...props}
    >
      {children}
      <ChevronsUpDown className="size-4 opacity-50" />
    </Button>
  );
});

function SelectContent({ className, children, ...props }) {
  const context = useSelectContext();
  const contentStyle = context.contentStyle;
  const attachContentNode = React.useCallback(
    (node) => {
      context.setContentNode(node);
    },
    [context],
  );

  if (!context.open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      ref={attachContentNode}
      className={cn(
        "relative z-50 max-h-96 min-w-32 overflow-hidden border-2 border-black bg-white text-black shadow-[6px_6px_0_#000]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className,
      )}
      data-slot="select-content"
      style={contentStyle || undefined}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          context.setOpen(false);
        }
      }}
      {...props}
    >
      <div>{children}</div>
    </div>,
    document.body,
  );
}

function SelectLabel({ className, ...props }) {
  return (
    <div
      data-slot="select-label"
      className={cn("bg-black px-2 py-1.5 text-sm font-black uppercase text-[#FFE121]", className)}
      {...props}
    />
  );
}

function SelectItem({ className, children, value, ...props }) {
  const context = useSelectContext();
  const label = React.Children.toArray(children)
    .map((child) => (typeof child === "string" ? child : ""))
    .join("");

  const isSelected = context.value === value;

  return (
    <button
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center py-1.5 pr-8 pl-2 text-left text-sm font-bold outline-hidden hover:bg-[#22FF00] hover:text-black select-none focus:bg-[#22FF00] focus:text-black data-disabled:pointer-events-none data-disabled:opacity-50",
        isSelected && "bg-[#22FF00] text-black",
        className,
      )}
      type="button"
      onClick={() => context.selectValue(value, label || String(children))}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        {isSelected ? <CheckIcon className="size-4" /> : null}
      </span>
      <span>{children}</span>
    </button>
  );
}

function SelectSeparator({ className, ...props }) {
  return <div data-slot="select-separator" className={cn("-mx-1 my-1 h-0.5 bg-black", className)} {...props} />;
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};