import React from "react";
import moment from "moment";
import { Button, Popconfirm } from "antd";
import styles from "../Tasks/TaskManager.module.css";

function Task({ task, onDelete, onEdit }) {
  return (
    <div className={styles.task}>
      <p><span className="fw-bold">Title:</span> {task.title}</p>
      <p><span className="fw-bold">Description:</span> {task.description}</p>
      <p><span className="fw-bold">Deadline:</span> {moment(task.deadline).format("YYYY-MM-DD")}</p>
      <p><span className="fw-bold">Status:</span> {task.status}</p>
      <p><span className="fw-bold">Assignee:</span> {task.assignee.join(", ")}</p>
      <div className={styles.buttons}>
        <Button
          type="primary"
          onClick={() => {
            onEdit(task);
          }}
        >
          Edit
        </Button>
        <Popconfirm
          title="Are you sure you want to delete this task?"
          onConfirm={() => onDelete(task.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      </div>
    </div>
  );
}

export default Task;