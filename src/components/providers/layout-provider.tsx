"use client";

import Navigation from "../core/navigation";

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="main-content">
        {children}
      </main>
    </>
  );
}