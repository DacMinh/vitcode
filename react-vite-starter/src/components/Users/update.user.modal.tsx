import { useEffect, useState } from "react";
import { Modal, Input, notification } from 'antd';
import { updateCrurrentUser } from '../../services/axios';

interface IProps {
    getData: any;
    setIsUpdateModalOpen: (v: boolean) => void;
    isUpdateModalOpen: boolean;
    selectedUser: any
    setSelectedUser: any

}
const UpdateUserModal = (props: IProps) => {
    const { getData, setIsUpdateModalOpen, isUpdateModalOpen, selectedUser, setSelectedUser } = props;
    const initialState = {
        _id: '',
        email: '',
        name: '',
        password: '',
        age: '',
        gender: '',
        address: '',
        role: '',
    };
    useEffect(() => {
        // If selectedUser has a value, update the formData with its values
        if (selectedUser) {
            setFormData(selectedUser);
        } else {
            // If selectedUser is null, reset the form data
            setFormData(initialState);
        }
    }, [selectedUser]);
    const [formData, setFormData] = useState(initialState);
    const handleCancel = () => {
        setFormData(initialState);
        setIsUpdateModalOpen(false);
        setSelectedUser(null)
    }
    const handleOk = async () => {
        try {
            const response: any = await updateCrurrentUser(formData);
            notification.success({
                message: response.message
            });
            setIsUpdateModalOpen(false);

        } catch (error) {
            console.error('Error creating new user:', error);
            // Xử lý lỗi, ví dụ: Hiển thị thông báo lỗi cho người dùng
            notification.error({
                message: 'Lỗi'
            });
        }
        getData();
    };
    return (
        <>
            <Modal title="Update User" open={isUpdateModalOpen} onOk={handleOk} onCancel={() => handleCancel()} maskClosable={false} >
                <div>
                    <label>Name</label>
                    <Input value={formData.name}
                        onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
                </div>
                <div>
                    <div>
                        <label>Email</label>
                        <Input
                            value={formData.email}
                            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <Input
                            disabled
                            value={formData.password}
                            onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                        />
                    </div>
                    <div>
                        <label>Age</label>
                        <Input

                            value={formData.age}
                            onChange={(event) => setFormData({ ...formData, age: event.target.value })}
                        />
                    </div>
                    <div>
                        <label>Gender</label>
                        <Input
                            value={formData.gender}
                            onChange={(event) => setFormData({ ...formData, gender: event.target.value })}
                        />
                    </div>
                    <div>
                        <label>Address</label>
                        <Input
                            value={formData.address}
                            onChange={(event) => setFormData({ ...formData, address: event.target.value })}
                        />
                    </div>
                    <div>
                        <label>Role</label>
                        <Input
                            value={formData.role}
                            onChange={(event) => setFormData({ ...formData, role: event.target.value })}
                        />
                    </div>
                </div>
            </Modal></>

    )
}


export default UpdateUserModal