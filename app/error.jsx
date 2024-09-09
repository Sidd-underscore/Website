"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }) {
  return (
    <div>
      <h1 className="text-5xl font-bold">Something went wrong!</h1>
      <p className="mt-4">Here, let&apos;s try again:</p>
      <Button className="mt-2" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
