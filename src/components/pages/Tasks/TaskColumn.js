import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "../Tasks/Task";
import styles from "../Tasks/TaskManager.module.css";




function TaskColumn({ title, status, tasks, onDelete, onEdit }) {
  return (
    <div style={{ margin: "8px", flex: 1 }}>
      <h2>{title}</h2>
      <Droppable droppableId={status}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: "100px" }}>
            {tasks
              .filter((task) => task.status === status)
              .map((task, index) => (
                <Draggable key={task.key} draggableId={`${task.key}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task task={task} onDelete={onDelete} onEdit={onEdit} />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TaskColumn;





// import React from "react";
// import Task from "../Tasks/Task";
// import styles from "../Tasks/TaskManager.module.css";

// function TaskColumn({ title, status, tasks, onDelete, onEdit }) {
//   return (
//     <div className={styles.column}>
//       <h2 className={styles.columnTitle}>{title}</h2>
//       {tasks
//         .filter((task) => task.status === status)
//         .map((task) => (
//           <Task key={task.key} task={task} onDelete={onDelete} onEdit={onEdit} />
//         ))}
//     </div>
//   );
// }

// export default TaskColumn;