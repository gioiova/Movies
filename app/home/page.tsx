"use client";

import React, { Suspense } from "react";
import { HomePageContent } from "@/components/home/HomePageContent"; 

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Suspense fallback={<div>Loading...</div>}>
        <HomePageContent />
      </Suspense>
    </div>
  );
}
