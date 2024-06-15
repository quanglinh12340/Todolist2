import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Todo.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const Todo = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDecription] = useState("");
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);

  const titleInputRef = useRef(null);

  const handleAddTodos = () => {
    const newTodos = { title: newTitle, description: newDescription };
    const updateTodos = [...allTodos, newTodos];
    setAllTodos(updateTodos);
    setNewTitle("");
    setNewDecription("");
    titleInputRef.current.focus();
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(allTodos));
  }, [allTodos]);
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setAllTodos(savedTodos);
    }
  }, []);

  return (
    <>
      <h1>My Todos</h1>
      <div className={cx("todo-wrapper")}>
        <div className={cx("todo-input")}>
          <div className={cx("todo-input-items")}>
            <label>Title</label>
            <input
              ref={titleInputRef}
              value={newTitle}
              type="text"
              placeholder="What's the task title?"
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className={cx("todo-input-items")}>
            <label>Description</label>
            <input
              value={newDescription}
              type="text"
              placeholder="What's the task description?"
              onChange={(e) => setNewDecription(e.target.value)}
            />
          </div>
          <div className={cx("todo-input-items")}>
            <button
              type="button"
              className={cx("primaryBtn")}
              onClick={handleAddTodos}
            >
              Add
            </button>
          </div>
        </div>
        <div className={cx("btn-area")}>
          <button
            className={cx("secondaryBtn", { active: !isCompleteScreen })}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={cx("secondaryBtn", { active: isCompleteScreen })}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className={cx("todo-list")}>
          {allTodos.map((item, index) => {
            return (
              <div className={cx("todo-list-items")} key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <FontAwesomeIcon
                    className={cx("icon-delete")}
                    icon={faTrash}
                  />
                  <FontAwesomeIcon
                    className={cx("icon-check")}
                    icon={faCheck}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todo;
