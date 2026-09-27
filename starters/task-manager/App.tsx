import { useState } from "react";

type Task = { id: string; title: string; completed: boolean };
type Filter = "all" | "open" | "complete";
const storageKey = "my-task-manager-v1";

function readTasks(): Task[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(value)
      ? value.filter(
          (item): item is Task =>
            typeof item?.id === "string" &&
            typeof item?.title === "string" &&
            typeof item?.completed === "boolean",
        )
      : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(readTasks);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  function save(next: Task[]) {
    setTasks(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  }
  const visible = tasks.filter(
    (task) =>
      filter === "all" ||
      (filter === "complete" ? task.completed : !task.completed),
  );
  return (
    <main>
      <h1>Task manager</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const clean = title.trim();
          if (!clean) return;
          save([
            ...tasks,
            { id: crypto.randomUUID(), title: clean, completed: false },
          ]);
          setTitle("");
        }}
      >
        <label htmlFor="task-title">Task title</label>
        <input
          id="task-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <button type="submit">Add task</button>
      </form>
      <fieldset>
        <legend>Show tasks</legend>
        {(["all", "open", "complete"] as const).map((choice) => (
          <label key={choice}>
            <input
              type="radio"
              name="filter"
              checked={filter === choice}
              onChange={() => setFilter(choice)}
            />
            {choice}
          </label>
        ))}
      </fieldset>
      {visible.length ? (
        <ul>
          {visible.map((task) => (
            <li key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    save(
                      tasks.map((item) =>
                        item.id === task.id
                          ? { ...item, completed: !item.completed }
                          : item,
                      ),
                    )
                  }
                />
                {task.title}
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks match this filter.</p>
      )}
      <p>Tasks are saved on this device only.</p>
    </main>
  );
}
