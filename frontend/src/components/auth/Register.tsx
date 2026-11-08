import { Alert, Button, Checkbox, Col, Form, Input, Row } from 'antd';
import styles from './Auth.module.scss';
import { useSignUpMutation } from '../../hooks/useAuth';
import Text from '../../reusableComponents/text/Text';
import { RoutePath } from '../../common/enums/routePath';
import { Link, useNavigate } from 'react-router-dom';
import type { AuthSignUpSchema } from '../../common/schemas/authSchemas';
import { useState } from 'react';
import { getApiErrorMessages } from '../../utils/getApiErrorMessages';
const Register = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string[]>([]);
  const { mutate, isPending: isProcessing } = useSignUpMutation();
  const navigate = useNavigate();

  const handleCreateAccount = (schema: AuthSignUpSchema) => {
    mutate(schema, {
      onSuccess: () => {
        navigate(RoutePath.SIGN_IN);
      },
      onError: (error) => {
        setError(getApiErrorMessages(error));
      },
    });
  };

  const handleSubmit = async () => {
    const values = await form.getFieldsValue();
    handleCreateAccount(values);
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
        <Row gutter={[24, 0]}>
          <Col span={24} sm={12}>
            <Form.Item
              label={'First Name'}
              name="firstName"
              rules={[
                { required: true, message: 'Please input your first name!' },
              ]}
            >
              <Input size="large" placeholder={'Jhon'} />
            </Form.Item>
          </Col>

          <Col span={24} sm={12}>
            <Form.Item
              label={'Last Name'}
              name="lastName"
              rules={[
                { required: true, message: 'Please input your last name!' },
              ]}
            >
              <Input size="large" placeholder={'Doe'} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={'Email'}
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input size="large" placeholder={'email@example.com'} />
        </Form.Item>
        <Row gutter={[24, 0]}>
          <Col span={24} sm={12}>
            <Form.Item
              label={'Password'}
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password size="large" placeholder="********" />
            </Form.Item>
          </Col>

          <Col span={24} sm={12}>
            <Form.Item
              label={'Confirm Password'}
              name="confirmPassword"
              rules={[
                { required: true, message: 'Please confirm your password!' },
              ]}
            >
              <Input.Password size="large" placeholder="********" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="termsOfService"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: 'Please agree to the terms and conditions!',
            },
          ]}
        >
          <Checkbox>I agree to the terms and conditions</Checkbox>
        </Form.Item>
        {error.length > 0 && (
          <Alert
            type="error"
            showIcon
            className={styles.errorAlert}
            message={
              error.length === 1 ? (
                error[0]
              ) : (
                <ul className={styles.errorList}>
                  {error.map((message) => (
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
            Register
          </Button>
        </Form.Item>
      </Form>
      <Text type="secondary" className={styles.loginLink}>
        Already have an account? <Link to={RoutePath.SIGN_IN}>Login here</Link>
      </Text>
    </>
  );
};

export default Register;
