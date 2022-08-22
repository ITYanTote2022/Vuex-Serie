import axios from "axios"
export default {
  state: {
    todos: []
  },
  getters: {
    myTodos(state){
        return state.todos;
    }
  },
  mutations: {
    setTodos(state,todos){
       state.todos=todos;
    },
    setTodo(state,newTodo){
       state.todos.unshift(newTodo);
    },
    removeTodo(state,removeId){
      state.todos=state.todos.filter(todo=>{
        return todo.id!=removeId
      })
    },
    updateTodo(state,todo){
      state.todos.forEach((t)=> {
         if(t.id === todo.id){
             t = todo;
         }
      });
    }
  },
  actions: {
      async getTodos({commit}){
        let res = await axios.get("https://jsonplaceholder.typicode.com/todos");
        let todos = res.data;

        commit('setTodos',todos)
      },
      async addTodo({commit},newTodo){
        let res = await axios.post("https://jsonplaceholder.typicode.com/todos",newTodo);
        
        commit('setTodo',res.data)
      },
      async deleteTodo({commit},removeId){
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${removeId}`);

        commit('removeTodo',removeId)
      },
      async filterTodos({commit},limit){
        let res = await axios.get(`https://jsonplaceholder.typicode.com/todos/?_limit=${limit}`);

        commit('setTodos',res.data)
      },
      async updateTodo({commit},todo){
        let res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`,todo);

        commit('updateTodo',res.data)
      }
  },
};
