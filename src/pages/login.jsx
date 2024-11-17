import { ArrowRightOutlined } from "@ant-design/icons";
import { Form, Row, Col, Input, Divider, Button, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";



const LoginPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        console.log(">>>>>>>> check values:", values);
        setLoading(true);
        const res = await loginAPI(values.email, values.password);
        if (res.data) {
            message.success("Login suceed");
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);
            navigate("/");
        } else {
            notification.error({
                message: "Error Login",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false);

    }
    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>Đăng nhập</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        name="basic"
                        onFinish={onFinish}
                        style={{ margin: "10px" }}
                    // onFinishFailed={onFinishFailed}
                    // autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                                {
                                    type: "email",
                                    message: 'Please input corrected email format!',
                                }
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

                        <Form.Item>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Button
                                    loading={loading}
                                    type="primary"
                                    onClick={() => form.submit()}>
                                    Login
                                </Button>
                                <Link to="/">Go to homepage <ArrowRightOutlined /></Link>
                            </div>
                        </Form.Item>
                    </Form>
                    <Divider />

                </fieldset>
            </Col>
        </Row>
    )
}

export default LoginPage;