import { Alert, Button, Form, Input } from 'antd';
import styles from './Auth.module.scss';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../common/enums/routePath';
import { useState } from 'react';
import { getApiErrorMessages } from '../../utils/getApiErrorMessages';

const Login = () => {
  const [form] = Form.useForm();
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>();
  const handleSubmit = async () => {
    setIsProcessing(true);
    const values = await form.getFieldsValue();

    login({
      email: values.email,
      password: values.password,
    })
      .then(() => {
        console.log('Login success');
      })
      .catch((error) => {
        setErrorMessages(getApiErrorMessages(error));
      })
      .finally(() => {
        setIsProcessing(false);
        if (errorMessages.length < 0) {
          navigate(RoutePath.DASHBOARD);
        }
      });
  };

  return (
    <>
      <Form
        className={styles.form}
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label={'Email'}
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input size="large" placeholder={'email@example.com'} />
        </Form.Item>

        <Form.Item
          label={'Password'}
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" placeholder="********" />
        </Form.Item>
        {errorMessages.length > 0 && (
          <Alert
            type="error"
            showIcon
            className={styles.errorAlert}
            message={
              errorMessages.length === 1 ? (
                errorMessages[0]
              ) : (
                <ul className={styles.errorList}>
                  {errorMessages.map((message) => (
                    <li key={message}>{message}</li>
                  ))}
                </ul>
              )
            }
          />
        )}
        <Form.Item label={null}>
          <Button
            className={styles.submitButton}
            type="primary"
            htmlType="submit"
            size="large"
            loading={isProcessing}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
