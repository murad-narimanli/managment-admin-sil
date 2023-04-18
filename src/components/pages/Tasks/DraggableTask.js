import React from "react";
import { useDrag } from "react-dnd";

function DraggableTask({ task, children, onDrop }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: task,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onDrop(item.key, dropResult.status);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {children}
    </div>
  );
}

export default DraggableTask;
