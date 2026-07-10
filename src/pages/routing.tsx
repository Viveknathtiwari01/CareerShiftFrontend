
import { deriveReport, useAssessment } from "@/store/mock-store";



function RoutingPage() {
  const { submitted } = useAssessment();
  const report = deriveReport(submitted);
  const groups = ["automate", "augment", "master"] as const;
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <h1 className="font-display text-3xl font-bold tracking-tight">Task routing</h1>
      <p className="mt-2 text-muted-foreground">
        How each task should be handled by AI, with you, or by you alone.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {groups.map((g) => (
          <div key={g} className="surface-card p-5">
            <h2 className="font-display text-base font-bold capitalize">{g}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {report.routed
                .filter((t) => t.routing === g)
                .map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center justify-between rounded-lg border border-border px-3 py-2"
                  >
                    <span className="truncate">{t.title}</span>
                    <span className="text-xs text-muted-foreground">{t.hoursPerWeek}h</span>
                  </li>
                ))}
              {report.routed.filter((t) => t.routing === g).length === 0 && (
                <li className="text-xs text-muted-foreground">No tasks in this bucket.</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoutingPage;
