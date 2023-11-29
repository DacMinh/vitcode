import { useEffect, useState } from 'react'

import { Table, Button, notification, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import CreateUserModal from './create.user.modal';
import UpdateUserModal from './update.user.modal';
import { DeleteUser, getDataAll } from '../../services/axios';
const UsersTable = () => {
  interface IUser {
    email: string;
    name: string;
    role: string;
    _id: string;


  }
  interface DeleteModal {
    _id: string;
  }
  const [listUsers, setListUsers] = useState([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<DeleteModal | {}>({});
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)



  const confirmDelete = () => {

    DeleleUserTabel(deleteModal)

  };


  const columns: ColumnsType<IUser> = [{
    title: 'Email',
    dataIndex: 'email',
    render: (value, record) => {

      return (<div>{record.email}</div>)

    }
  }, {
    title: 'Name',
    dataIndex: 'name',

  }, {
    title: 'Role',
    dataIndex: 'role',

  }, {
    title: 'Action',
    render: (value, record) => {

      return (<div><button onClick={() => {
        setSelectedUser(record)
        setIsUpdateModalOpen((true))
      }}>Edit</button>

        <Popconfirm
          title="Delete the User"
          description={`"Are you sure to delete this user. name = ${record.name}?"`}
          onConfirm={confirmDelete}
          okText="Yes"
          cancelText="No">
          <Button style={{ marginLeft: 20 }} danger onClick={() => setDeleteModal({ _id: record._id })}>Delete</Button>
        </Popconfirm></div>
      )
    }
  }]

  useEffect(() => { getData() }, []);

  const getData = async () => {


    const response: any = await getDataAll();

    const result1 = await response.data.result;

    setListUsers(result1)
  }


  const DeleleUserTabel: (deleteModal: { _id: string }) => Promise<void> = async (deleteModal) => {
    try {
      const response: any = await DeleteUser(deleteModal);
      console.log('check response ', response);

      if (response && response.message) {
        notification.success({
          message: response.message
        });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      notification.error({
        message: 'Lỗi khi xóa người dùng'
      });
    }

    getData();
  };




  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Table Users</h2>
        <div>
          <Button
            icon={<PlusOutlined />}
            type={'primary'}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add new
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={listUsers} rowKey={'_id'} />
      <CreateUserModal getData={getData} setIsCreateModalOpen={setIsCreateModalOpen} isCreateModalOpen={isCreateModalOpen} />
      <UpdateUserModal getData={getData} setIsUpdateModalOpen={setIsUpdateModalOpen} isUpdateModalOpen={isUpdateModalOpen} setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
    </div>
  )
}

export default UsersTable