import { useState } from "react";
import { Modal, Table, Button, Input, notification } from 'antd';
import { createNewUser } from '../../services/axios';

interface IProps {
    getData: any;
    setIsCreateModalOpen: (v: boolean) => void;
    isCreateModalOpen: boolean
}
const CreateUserModal = (props: IProps) => {


    const { getData, setIsCreateModalOpen, isCreateModalOpen } = props;

    const initialState = {
        email: '',
        name: '',
        password: '',
        age: '',
        gender: '',
        address: '',
        role: '',
    };

    const [formData, setFormData] = useState(initialState);
    // Để cập nhật một trạng thái cụ thể, bạn có thể sử dụng hàm setFormData như sau:
    // setFormData({ ...formData, email: 'newEmailValue' });
    // Nếu bạn muốn thay đổi giá trị của trạng thái email, bạn có thể sử dụng:
    // setFormData({ ...formData, email: 'newEmailValue' });


    const handleCancel  = () => {
        setFormData(initialState);
        setIsCreateModalOpen(false);
    }

    const handleOk = async () => {
        try {
            // Kiểm tra xem tất cả các trường thông tin cần thiết đã được điền đầy đủ hay không
            if (
                formData.email &&
                formData.name &&
                formData.password &&
                formData.age &&
                formData.gender &&
                formData.address &&
                formData.role
            ) {
                const response: any = await createNewUser({ ...formData });

                setIsCreateModalOpen(false);

                // Kiểm tra xem có message trong data hay không trước khi hiển thị thông báo
                if (response && response.message) {
                    notification.success({
                        message: response.message
                    });
                }
            } else {
                // Xử lý trường hợp dữ liệu không hợp lệ, ví dụ: Hiển thị thông báo cho người dùng
                notification.error({
                    message: 'Có lỗi xãy ra'
                });
            }
        } catch (error) {
            console.error('Error creating new user:', error);
            // Xử lý lỗi, ví dụ: Hiển thị thông báo lỗi cho người dùng
            notification.error({
                message: 'Lỗi'
            });
        }

        getData();
        setFormData(initialState);
    };


    return (
        <>
            <Modal title="Add new user" open={isCreateModalOpen} onOk={handleOk} onCancel={() => handleCancel()} maskClosable={false} >
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


export default CreateUserModal