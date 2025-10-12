"use client";
import { Suspense } from "react";
import Verify from "@/components/Verify";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <Verify />
    </Suspense>
      );
}