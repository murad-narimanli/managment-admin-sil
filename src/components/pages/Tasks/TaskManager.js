// import { useState, useEffect } from "react";
// import dayjs from "dayjs";
// import { Form, Input, Select, Button, message, DatePicker, Modal } from "antd";
// import EditTaskModal from "../Tasks/EditTaskModal";
// import TaskColumn from "../Tasks/TaskColumn";
// import styles from "./TaskManager.module.css";

// const { Option } = Select;

// function TaskManager() {
//   const [tasks, setTasks] = useState([]);
//   const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [editTask, setEditTask] = useState(null);

//   const onFinish = (values) => {
//     const newId = Date.now() + Math.floor(Math.random() * 1000);

//     const newTask = {
//       key: newId,
//       title: values.title,
//       description: values.description,
//       deadline: values.deadline.toISOString(),
//       status: values.status,
//       assignee: values.assignee,
//     };

//     setTasks([...tasks, newTask]);
//     form.resetFields();
//     setAddTaskModalVisible(false);
//     message.success("Operation was successful!"); // Add this line
//   };

//   const onEditSave = (updatedTask) => {
//     const updatedTasks = tasks.map((task) => {
//       if (task.key === updatedTask.key) {
//         return updatedTask;
//       } else {
//         return task;
//       }
//     });
//     setTasks(updatedTasks);
//     setEditModalVisible(false);
//     message.success("Operation was successful!");
//   };

//   const onDelete = (taskId) => {
//     const updatedTasks = tasks.filter((task) => task.key !== taskId);
//     setTasks(updatedTasks);
//     message.success("Operation was successful!");
//   };

//   const [form] = Form.useForm();

//   useEffect(() => {
//     const storedTasks = localStorage.getItem("tasks");
//     if (storedTasks) {
//       setTasks(JSON.parse(storedTasks));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "end" }}>
//         <Button
//           type="primary"
//           onClick={() => setAddTaskModalVisible(true)}
//           style={{ marginBottom: "1rem", float: "right" }}
//         >
//           Add Task
//         </Button>
//       </div>

//       <Modal
//         title="Add Task"
//         visible={addTaskModalVisible}
//         onCancel={() => setAddTaskModalVisible(false)}
//         footer={null}
//       >
//         <Form form={form} name="add-task-form" onFinish={onFinish}>
//           <Form.Item
//             label="Title"
//             name="title"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input the title of the task!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Description"
//             name="description"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input the description of the task!",
//               },
//             ]}
//           >
//             <Input.TextArea />
//           </Form.Item>
//           <Form.Item
//             label="Deadline"
//             name="deadline"
//             rules={[
//               {
//                 required: true,
//                 message: "Please select the deadline of the task!",
//               },
//             ]}
//           >
//             <DatePicker
//               disabledDate={(current) => {
//                 return current && current < dayjs().startOf("day"); // Update this line
//               }}
//             />
//           </Form.Item>
//           <Form.Item
//             label="Status"
//             name="status"
//             rules={[
//               {
//                 required: true,
//                 message: "Please select the status of the task!",
//               },
//             ]}
//           >
//             <Select>
//               <Option value="Waiting">Waiting</Option>
//               <Option value="In Progress">In Progress</Option>
//               <Option value="Done">Done</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item
//             label="Assignee"
//             name="assignee"
//             rules={[
//               {
//                 required: true,
//                 message: "Please select the assignee(s) for the task!",
//               },
//             ]}
//           >
//             <Select mode="multiple">
//               <Option value="John Doe">John Doe</Option>
//               <Option value="Jane Smith">Jane Smith</Option>
//               <Option value="Bob Johnson">Bob Johnson</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Add Task
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       <div className={styles.board}>
//         <TaskColumn
//           title="TODO"
//           status="Waiting"
//           tasks={tasks}
//           onDelete={onDelete}
//           onEdit={(task) => {
//             setEditTask(task);
//             setEditModalVisible(true);
//           }}
//         />
//         <TaskColumn
//           title="In Progress"
//           status="In Progress"
//           tasks={tasks}
//           onDelete={onDelete}
//           onEdit={(task) => {
//             setEditTask(task);
//             setEditModalVisible(true);
//           }}
//         />
//         <TaskColumn
//           title="Done"
//           status="Done"
//           tasks={tasks}
//           onDelete={onDelete}
//           onEdit={(task) => {
//             setEditTask(task);
//             setEditModalVisible(true);
//           }}
//         />
//       </div>

//       {editTask && (
//         <EditTaskModal
//           task={editTask}
//           visible={editModalVisible}
//           onCancel={() => setEditModalVisible(false)}
//           onSave={onEditSave}
//         />
//       )}
//     </div>
//   );
// }

// export default TaskManager;






import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import dayjs from "dayjs";
import { Form, Input, Select, Button, message, DatePicker, Modal } from "antd";
import EditTaskModal from "../Tasks/EditTaskModal";
import TaskColumn from "../Tasks/TaskColumn";
import styles from "./TaskManager.module.css";

const { Option } = Select;

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const onFinish = (values) => {
    const newId = Date.now() + Math.floor(Math.random() * 1000);

    const newTask = {
      key: newId,
      title: values.title,
      description: values.description,
      deadline: values.deadline.toISOString(),
      status: values.status,
      assignee: values.assignee,
    };

    setTasks([...tasks, newTask]);
    form.resetFields();
    setAddTaskModalVisible(false);
    message.success("Operation was successful!"); // Add this line
  };

  const onEditSave = (updatedTask) => {
    const updatedTasks = tasks.map((task) => {
      if (task.key === updatedTask.key) {
        return updatedTask;
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
    setEditModalVisible(false);
    message.success("Operation was successful!");
  };

  const onDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.key !== taskId);
    setTasks(updatedTasks);
    message.success("Operation was successful!");
  };

  const [form] = Form.useForm();

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Check if the destination is valid
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const startColumnTasks = tasks.filter(
      (task) => task.status === source.droppableId
    );
    const finishColumnTasks = tasks.filter(
      (task) => task.status === destination.droppableId
    );

    if (source.droppableId === destination.droppableId) {
      const newColumnTasks = Array.from(startColumnTasks);
      const [removed] = newColumnTasks.splice(source.index, 1);
      newColumnTasks.splice(destination.index, 0, removed);

      const newTasks = tasks.map((task) => {
        const index = newColumnTasks.findIndex((t) => t.key === task.key);
        if (index >= 0) {
          return newColumnTasks[index];
        }
        return task;
      });

      setTasks(newTasks);
    } else {
      // Moving tasks between different columns
      const newStartColumnTasks = Array.from(startColumnTasks);
      const [removed] = newStartColumnTasks.splice(source.index, 1);
      removed.status = destination.droppableId;

      const newFinishColumnTasks = Array.from(finishColumnTasks);
      newFinishColumnTasks.splice(destination.index, 0, removed);

      const newTasks = tasks.map((task) => {
        const startColumnIndex = newStartColumnTasks.findIndex(
          (t) => t.key === task.key
        );
        const finishColumnIndex = newFinishColumnTasks.findIndex(
          (t) => t.key === task.key
        );

        if (startColumnIndex >= 0) {
          return newStartColumnTasks[startColumnIndex];
        }
        if (finishColumnIndex >= 0) {
          return newFinishColumnTasks[finishColumnIndex];
        }
        return task;
      });

      setTasks(newTasks);
    }
  };

  return (
    // Wrap your task columns with the DragDropContext component
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            type="primary"
            onClick={() => setAddTaskModalVisible(true)}
            style={{ marginBottom: "1rem"}}
          >
            Add Task
          </Button>
        </div>

        <Modal
          title="Add Task"
          visible={addTaskModalVisible}
          onCancel={() => setAddTaskModalVisible(false)}
          footer={null}
        >
          <Form form={form} name="add-task-form" onFinish={onFinish}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input the title of the task!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input the description of the task!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Deadline"
              name="deadline"
              rules={[
                {
                  required: true,
                  message: "Please select the deadline of the task!",
                },
              ]}
            >
              <DatePicker
                disabledDate={(current) => {
                  return current && current < dayjs().startOf("day"); // Update this line
                }}
              />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please select the status of the task!",
                },
              ]}
            >
              <Select>
                <Option value="Waiting">Waiting</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Done">Done</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Assignee"
              name="assignee"
              rules={[
                {
                  required: true,
                  message: "Please select the assignee(s) for the task!",
                },
              ]}
            >
              <Select mode="multiple">
                <Option value="John Doe">John Doe</Option>
                <Option value="Jane Smith">Jane Smith</Option>
                <Option value="Bob Johnson">Bob Johnson</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Task
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <div className={styles.board}>
          <TaskColumn
            title="TODO"
            status="Waiting"
            tasks={tasks}
            onDelete={onDelete}
            onEdit={(task) => {
              setEditTask(task);
              setEditModalVisible(true);
            }}
          />
          <TaskColumn
            title="In Progress"
            status="In Progress"
            tasks={tasks}
            onDelete={onDelete}
            onEdit={(task) => {
              setEditTask(task);
              setEditModalVisible(true);
            }}
          />
          <TaskColumn
            title="Done"
            status="Done"
            tasks={tasks}
            onDelete={onDelete}
            onEdit={(task) => {
              setEditTask(task);
              setEditModalVisible(true);
            }}
          />
        </div>

        {editTask && (
          <EditTaskModal
            task={editTask}
            visible={editModalVisible}
            onCancel={() => setEditModalVisible(false)}
            onSave={onEditSave}
          />
        )}
      </div>{" "}
    </DragDropContext>
  );
}

export default TaskManager;
