const apiUrl = "http://localhost:3200/api";

const defaultHeaders = () => ({
  "Content-Type": "application/json",
  "user-id": localStorage.getItem("user_id") || "",
});

type Task = {
  id: string;
  title: string;
  status: string;
};


export const apiGetTasks = async () => {
  const response = await fetch(`${apiUrl}/tasks`, { method: "GET" });
  const res = await response.json();
  return res.data;
};

export const apiSaveTask = async (task: Omit<Task, "userId">) => {
  const response = await fetch(`${apiUrl}/task`, {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify(task),
  });
  const data: Task = await response.json();
  return data;
};

export const apiDeleteTask = async (taskId: { id: string }) => {
  await fetch(`${apiUrl}/task/${taskId.id}`, {
    method: "DELETE",
    headers: defaultHeaders(),
  });
};


/* --- Begin Auth --- */

export const apisignUp = async (email: string, name: string): Promise<string> => { 

  const response = await fetch(`${apiUrl}/signup`, {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify({
      email,
      name
    }),
  });
  
  return response.ok ?  response.json() : "Completar com erro";
};

export const login = async (email: string)  => { 

  try {
    const res = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: defaultHeaders(),
      body: JSON.stringify({ email }),
    });

    return res.json();


  } catch {
    alert("Erro na requisição");
  }
};
