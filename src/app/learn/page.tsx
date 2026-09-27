import type { Metadata } from "next";
import { LearnDashboard } from "@/components/learn-dashboard";
import { ProgressTransfer } from "@/components/progress-transfer";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Choose a free learning path, save local progress, and continue coding without an account.",
};
export default function LearnPage() {
  return (
    <div className="shell interactive-page">
      <div className="page-intro">
        <span className="eyebrow">LEARN / YOUR STARTING POINT</span>
        <h1>
          Build your own <em>path.</em>
        </h1>
        <p>
          Learn the idea, try code, practice it, and prove it in a project. All
          core lessons are free.
        </p>
      </div>
      <LearnDashboard />
      <ProgressTransfer />
    </div>
  );
}
