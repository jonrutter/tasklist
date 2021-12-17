import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// components
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import TaskCreateForm from '../components/TaskCreateForm';

const Home = ({ list = [], label = 'To do', defaultItem = {} }) => {
  return (
    <Layout>
      <Helmet>
        <title>All Tasks | To Do List</title>
      </Helmet>
      <TaskList label={'All Tasks'} list={list} />
      <TaskCreateForm defaultItem={{}} />
    </Layout>
  );
};

export default Home;