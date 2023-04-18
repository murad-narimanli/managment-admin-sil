import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Button } from "antd";

const { Option } = Select;

function EditTaskModal({ task, visible, onCancel, onSave }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({ ...task, deadline: dayjs(task.deadline) });
  }, [task, form]);

  const onFinish = (values) => {
    setLoading(true);

    const updatedTask = {
      ...task,
      title: values.title,
      description: values.description,
      deadline: values.deadline.toISOString(),
      status: values.status,
      assignee: values.assignee,
    };

    onSave(updatedTask);

    setLoading(false);
  };

  // Rest of the component remains the same

  return (
    <Modal
      visible={visible}
      title="Edit Task"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          loading={loading}
          onClick={form.submit}
        >
          Save
        </Button>,
      ]}
    >
      <Form
        form={form}
        initialValues={{ ...task, deadline: dayjs(task.deadline) }}
        onFinish={onFinish}
      >
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
            format="YYYY-MM-DD"
            value={dayjs(task.deadline)}
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
      </Form>
    </Modal>
  );
}

export default EditTaskModal;
