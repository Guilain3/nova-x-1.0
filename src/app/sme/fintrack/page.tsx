// File: src/app/dashboard/fintrack/page.tsx
"use client";
import { useEffect, useState } from "react";
import FinTrackDashboardContent from "./FinTrackDashboardContent";

const FinTrackDashboard = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return <FinTrackDashboardContent />;
};

export default FinTrackDashboard;
