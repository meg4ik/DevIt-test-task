'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ArticleForm = ({ onCreate }) => {
  const initialValues = {
    title: '',
    description: '',
    link: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    link: Yup.string().url('Invalid URL'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://127.0.0.1:8088/admin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        onCreate();
        resetForm();
      } else {
        console.error('Failed to create article');
      }
    } catch (error) {
      console.error('Failed to create article:', error);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-4">
            <label htmlFor="title" className="block text-white-700">Title:</label>
            <Field type="text" id="title" name="title" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black" />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-white-700">Description:</label>
            <Field as="textarea" id="description" name="description" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black" />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="link" className="block text-white-700">Link:</label>
            <Field type="text" id="link" name="link" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black" />
            <ErrorMessage name="link" component="div" className="text-red-500 text-sm" />
          </div>
          <button type="submit" disabled={isSubmitting} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ArticleForm;
