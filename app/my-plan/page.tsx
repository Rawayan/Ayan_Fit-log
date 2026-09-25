import { Suspense } from "react";

import MyPlanPageContent from "@/components/MyPlanPageContent";

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0c0d10]" />}>
      <MyPlanPageContent />
    </Suspense>
  );
}