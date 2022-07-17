import React from "react";

const Task = ({ goal }) => {
  return (
    <div className="w-full py-4 border rounded-lg">
      <p className="text-3xl underline">{goal}</p>
    </div>
  );
};

export default Task;
