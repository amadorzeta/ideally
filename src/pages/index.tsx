import React from "react";
import Head from "next/head";
import { trpc } from "../utils/trpc";

export default function Home() {
  const { data, isLoading } = trpc.useQuery(["tasks.get-all"]);

  const [isActive, setIsActive] = React.useState(false);

  const toggleForm = () => {
    setIsActive((currentState) => !currentState);
  };

  if (isLoading || !data) return <div>Loading...</div>;

  const taskElements = (
    <div className="w-1/2 space-y-8">
      {data.map((task, index) => (
        <Task key={index} taskName={task.name} />
      ))}
    </div>
  );

  return (
    <>
      <Head>
        <title>Ideally</title>
      </Head>
      <main
        onClick={toggleForm}
        className="bg-slate-900 h-screen flex flex-col items-center font-serif text-zinc-100"
      >
        <h1 className="text-8xl pt-10 font-medium tracking-tight">Ideally,</h1>
        <h2 className="text-6xl py-10 tracking-tighter">
          what would you like to do today?
        </h2>
        {isActive ? <TaskForm onSubmit={toggleForm} /> : taskElements}
      </main>
    </>
  );
}

const TaskForm: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const client = trpc.useContext();

  const { mutate } = trpc.useMutation("tasks.create", {
    onSuccess: () => {
      client.invalidateQueries(["tasks.get-all"]);
    },
  });

  const [taskName, setTaskName] = React.useState("");

  const preventClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ name: taskName });
    onSubmit();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  return (
    <div onClick={preventClick} className="w-1/2">
      <form className="w-full h-full justify-center" onSubmit={handleSubmit}>
        <input
          autoFocus
          className="z-50 w-full h-36 bg-zinc-100 border-none outline-none rounded-lg px-8 text-6xl text-slate-900"
          type="text"
          value={taskName}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

const Task: React.FC<{ taskName: string }> = ({ taskName }) => {
  return (
    <div className="w-full text-3xl space-x-4">
      <span>#</span>
      <span className="underline">{taskName}</span>
    </div>
  );
};

const Cursor = () => {
  return (
    <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center pointer-events-none">
      <div className="bg-indigo-800 h-12 w-2 absolute"></div>
      <div className="bg-indigo-800 h-12 w-2 absolute rotate-90"></div>
    </div>
  );
};
