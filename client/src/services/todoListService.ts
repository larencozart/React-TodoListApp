import axios from 'axios';
import { PartialTodo } from '../types';

const getTodos = async () => {
  try {
    const response = await axios.get(`/api/todos`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const deleteTodo = async (id: number) => {
  try {
    await axios.delete(`api/todos/${id}`);
  } catch (error) {
    console.error(error);
  }
}

const updateTodo = async (updatedTodo: PartialTodo, id: number) => {
  try {
    const response = await axios.put(`/api/todos/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const createTodo = async (newTodo: PartialTodo) => {
  try {
    const response = await axios.post(`api/todos`, newTodo);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export {
  getTodos,
  deleteTodo,
  updateTodo,
  createTodo,
}