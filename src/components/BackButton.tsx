"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex h-10 w-fit items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 text-sm font-medium transition hover:bg-white/20"
    >
      <ArrowLeft className="size-4" />
      Back
    </button>
  );
};

export default BackButton;
