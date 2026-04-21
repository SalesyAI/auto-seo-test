"use client";

import Navigation from "./navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="main-content flex-1">
        {children}
      </main>
    </>
  );
}