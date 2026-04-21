"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h2 className="text-section-title text-white mb-4">Something went wrong</h2>
      <p className="text-body text-muted mb-6">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="btn-dark-pill"
      >
        Try again
      </button>
    </div>
  );
}