import React from 'react'
// import { Button, Select, Form, Input, InputNumber  , Row , Col } from 'antd';
import {Button , Form , Row , Col , Input , Switch , Space ,  } from "antd";
import { UnorderedListOutlined } from '@ant-design/icons';
import NoData from "../elements/NoData"








const Users = (props) => {
  const [form] = Form.useForm();
  

  return (

    <div>
<Row gutter={[16, 16]}>
      <Col xs={24} >
          <div>
            <div>
              <UnorderedListOutlined className='pe-3 '/>
              <span>Users</span>
            </div>
          </div>
        </Col>
        <Col xs={12} >
          <NoData/>
        </Col>
        <Col xs={12} className='bg-light border p-5 shadow' >
          <Form
            form={form}
            autoComplete='off'
          >
            <Form.Item
              label='Name'
              name='name'
              rules={[
                { required: true, message: "Fill name field" },
                {
                  type: "string",
                  min: 3
                },
              ]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item
              label='Surname'
              name='surname'
              rules={[
                { required: true, message: "Fill surname field" },
                {
                  type: "string",
                  min: 5
                },
              ]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item
              label='Username'
              name='username'
              rules={[
                { required: true, message: "Fill username field" },
                {
                  type: "string",
                  min: 5                },
              ]}
            >
              <Input size='large' />
            </Form.Item>
              
             <Form.Item
              label='Email'
              name='email'
              rules={[
                { required: true, message: "Enter email" },
                {
                  type: "email",
                  message: "Enter a valid email address",
                },
              ]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password size='large' />
            </Form.Item>
            <Row >
              <Col xs={12}>
                <Form.Item
                  label='Edit task'
                  valuePropName='checked'
                  name='editTask'
                  initialValue={false}
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item
                  label='Add Task'
                  valuePropName='checked'
                  name='addTask'
                  initialValue={false}
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item
                  label='Delete Task'
                  valuePropName='checked'
                  name='deleteTask'
                  initialValue={false}
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item
                  label='Change Settings'
                  valuePropName='checked'
                  name='changeSettings'
                  initialValue={false}
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item
                  label='Change Status'
                  valuePropName='checked'
                  name='changeStatus'
                  initialValue={false}
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Space>
                <Button
                  type='primary'
                  htmlType='submit'>Save</Button>
                <Button>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
     

    </div>
  )
}

export default Users