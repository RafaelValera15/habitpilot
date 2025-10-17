const GOAL_PATHS = [
  {
    title: "Fitness",
    description: "Build strength and endurance with guided routines and progressive tracking.",
    gradient: "from-emerald-500 via-emerald-400 to-emerald-600",
  },
  {
    title: "Reading",
    description: "Curate your reading list, set chapter goals, and celebrate every finished book.",
    gradient: "from-amber-500 via-orange-400 to-amber-600",
  },
  {
    title: "Meditation",
    description: "Reduce stress with daily mindfulness prompts and breathing exercises.",
    gradient: "from-indigo-500 via-indigo-400 to-indigo-600",
  },
  {
    title: "Finance",
    description: "Track savings, spending habits, and automate check-ins on financial milestones.",
    gradient: "from-rose-500 via-pink-400 to-rose-600",
  },
];

const GoalPathGrid = () => {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {GOAL_PATHS.map((path) => (
        <article
          key={path.title}
          className={`rounded-2xl border border-white/20 bg-gradient-to-br ${path.gradient} p-6 text-white shadow-lg`}
        >
          <h3 className="text-lg font-semibold">{path.title}</h3>
          <p className="mt-2 text-sm text-white/90">{path.description}</p>
        </article>
      ))}
    </section>
  );
};

export default GoalPathGrid;
