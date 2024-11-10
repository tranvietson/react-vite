import { Input, notification, Modal, Button, Form } from "antd";
import { registerUserAPI } from "../services/api.service";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    console.log('>>>>>>>> gia tri Form:', Form.useForm());
    const onFinish = async (values) => {
        //  console.log('>>>>>>> Check onFinish function:', values);
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone
        );
        if (res.data) {
            notification.success({
                message: "Register user",
                description: "Đăng ký user thành công"
            });
            navigate("/login")
        } else {
            notification.error({
                message: "Register user error",
                description: JSON.stringify(res.message)
            })
        }
    }

    return (
        <Form
            form={form}
            layout="vertical"
            name="basic"
            onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        // autoComplete="off"
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column", marginLeft: "50px" }}>
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Phone number"
                    name="phone"
                    rules={[
                        {
                            // required: true,

                            pattern: new RegExp(/\d+/g),
                            message: "Wrong format!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* <button type="submit">Register</button> */}
                <div>
                    <Button onClick={() => { form.submit() }} type="primary">Register</Button>
                </div>
            </div>

        </Form>
    )
}

export default RegisterPage;