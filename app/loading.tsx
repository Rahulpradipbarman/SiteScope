import { APP_CONSTANTS } from "@/constants/app";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background-primary">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-primary border-t-transparent" />
        <p className="text-sm text-text-secondary">
          {APP_CONSTANTS.statusMessages.analyzing}
        </p>
      </div>
    </div>
  );
}
