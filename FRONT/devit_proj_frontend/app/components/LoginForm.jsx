
"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Cookies from "universal-cookie";

const cookies = new Cookies();

const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('http://127.0.0.1:8088/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': cookies.get("csrftoken"),
        },
        body: JSON.stringify(values),
        credentials: 'same-origin',
      });
      if (response.ok) {
        router.push('/admin');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={handleSubmit}
    >
      <Form className="w-full max-w-xs mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block text-white-700">Username:</label>
          <Field type="text" name="username" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black" />
          <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-white-700">Password:</label>
          <Field type="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black" />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
