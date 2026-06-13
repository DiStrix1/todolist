import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "@/components/TaskForm";
import { api, type NewTask, type Task, type TaskStatus } from "@/lib/api";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tasks — Todo Manager" },
      { name: "description", content: "Manage your todo tasks with priorities and statuses." },
    ],
  }),
  component: TasksPage,
});

type Filter = "all" | TaskStatus;

const statusStyles: Record<TaskStatus, string> = {
  completed: "bg-teal-400 hover:bg-teal-400 text-white",
  "in-progress": "bg-fuchsia-400 hover:bg-fuchsia-400 text-white",
  pending: "bg-rose-400 hover:bg-rose-400 text-white",
};

const statusLabel: Record<TaskStatus, string> = {
  completed: "Completed",
  "in-progress": "In-Progress",
  pending: "Pending",
};

const priorityStyles: Record<string, string> = {
  high: "border-rose-400 text-rose-500",
  medium: "border-fuchsia-400 text-fuchsia-500",
  low: "border-teal-400 text-teal-500",
};

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  const load = async (f: Filter) => {
    setLoading(true);
    try {
      const data = f === "all" ? await api.list() : await api.byStatus(f);
      setTasks(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error("Failed to load tasks", { description: (e as Error).message });
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(filter);
  }, [filter]);

  const handleAdd = async (task: NewTask) => {
    try {
      await api.add(task);
      toast.success("Task added");
      setAddOpen(false);
      load(filter);
    } catch (e) {
      toast.error("Failed to add task", { description: (e as Error).message });
    }
  };

  const handleUpdate = async (task: NewTask) => {
    if (!editing) return;
    try {
      await api.update(editing.id, task);
      toast.success("Task updated");
      setEditing(null);
      load(filter);
    } catch (e) {
      toast.error("Failed to update task", { description: (e as Error).message });
    }
  };

  const handleDelete = async (id: Task["id"]) => {
    try {
      await api.remove(id);
      toast.success("Task deleted");
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      toast.error("Failed to delete task", { description: (e as Error).message });
    }
  };

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "in-progress", label: "In-Progress" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Toaster richColors position="top-right" />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Tasks</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Plan, track, and complete your work.
            </p>
          </div>
          <Button onClick={() => setAddOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Add Task
          </Button>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center text-muted-foreground">Loading tasks…</div>
        ) : tasks.length === 0 ? (
          <div className="rounded-lg border border-dashed py-20 text-center text-muted-foreground">
            No tasks to show. Create your first one!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <Card key={task.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-snug">{task.title}</CardTitle>
                    <Badge className={statusStyles[task.status]}>{statusLabel[task.status]}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Badge variant="outline" className={priorityStyles[task.priority]}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </Badge>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {task.createdDate}
                    </span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditing(task)}>
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(task.id)}>
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Task</DialogTitle></DialogHeader>
          <TaskForm
            onSubmit={handleAdd}
            onCancel={() => setAddOpen(false)}
            submitLabel="Add Task"
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Update Task</DialogTitle></DialogHeader>
          {editing && (
            <TaskForm
              initial={editing}
              onSubmit={handleUpdate}
              onCancel={() => setEditing(null)}
              submitLabel="Update Task"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
