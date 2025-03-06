import React, { useState, useRef, useEffect } from "react";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const inputRef = useRef();

  //Update localstorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  //Add New Task
  const addTask = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };
  //Update  Task Status
  const toggleTask = (id) => {
    setTodoList((prev) => {
      return prev.map((todo) => {
        if (id === todo.id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  //Delete TodoItem
  const deleteTodo = (id) => {
    setTodoList((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };
  return (
    <>
      <div className="w-[30-rem]">
        <h1
          className="text-lg my-2 font-medium
         text-amber-500"
        >
          To-Do List
        </h1>
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              className="py-3 px-4 w-full text-sm border focus:outline-none 
              focus:border-amber-500 "
              placeholder="add your task"
            />
          </div>
          <button
            className="py-3 px-4 bg-blue-600 text-white
           hover:bg-blue-700 text-sm font-medium rounded-sm border-none"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <p className="my-3 text-sm text-zinc-400">Fill task details</p>
      </div>
      <div className="w-[30-rem] bg-white shadow py-6 px-4 ">
        <fieldset className="space-y-3">
          <legend className="text-pink-600 font-medium">List of Task</legend>
          {/*list items start*/}
          {todoList.length === 0 ? (
            <p className="text-gray-500 text-sm ">No task Found</p>
          ) : (
            todoList.map((todo, index) => {
              return (
                <TodoItem
                  text={todo.text}
                  key={index}
                  isComplete={todo.isComplete}
                  id={todo.id}
                  toggleTask={toggleTask}
                  deleteTodo={deleteTodo}
                />
              );
            })
          )}
          {/*List Items End */}
        </fieldset>
      </div>
    </>
  );
};

export default Todo;
