export const API_BASE_URL = "http://localhost:8080";

export type TaskStatus = "pending" | "in-progress" | "completed";
export type TaskPriority = "high" | "medium" | "low";

export interface Task {
  id: string | number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdDate: string;
}

export type NewTask = Omit<Task, "id">;

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

export const api = {
  list: () => fetch(`${API_BASE_URL}/showTasks`).then((r) => handle<Task[]>(r)),
  byStatus: (status: TaskStatus) =>
    fetch(`${API_BASE_URL}/showTasks/status/${status}`).then((r) => handle<Task[]>(r)),
  add: (task: NewTask) =>
    fetch(`${API_BASE_URL}/addTasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then((r) => handle<Task>(r)),
  update: (id: string | number, task: Partial<Task>) =>
    fetch(`${API_BASE_URL}/updateTask/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then((r) => handle<Task>(r)),
  remove: (id: string | number) =>
    fetch(`${API_BASE_URL}/delete/${id}`, { method: "DELETE" }).then((r) => handle<void>(r)),
};
