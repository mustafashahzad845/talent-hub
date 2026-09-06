import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function ProtectedLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoadingSpinner size="lg" text="Loading Talent Hub…" />
    </div>
  );
}