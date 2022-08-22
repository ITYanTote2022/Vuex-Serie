<template>
<div>
   <h3 class="text-primary text-center">All todos</h3>
   <div class="container">
      <div class="row">
        <AddToDo/>
        <FilterToDos/>
      </div>
      <div class="row">
         <div class="col-md-4 my-4" v-for="todo in myTodos" :key="todo.id">
                 <b-card 
                    @dblclick="toggleCompleted(todo)"
                    :bg-variant="dynamicBackground(todo)"  
                    text-variant="white" class="text-center">
                        <b-card-text class="d-flex justify-content-between">
                            <span>{{todo.title}}</span>
                            <span><b-icon icon="trash-fill" @click="deleteTodo(todo.id)"></b-icon></span>   
                        </b-card-text>
                </b-card>
         </div>
      </div>
   </div>
</div>  
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AddToDo from './AddToDo.vue';
import FilterToDos from './FilterToDos.vue';


export default {
    computed: {
        ...mapGetters([
            "myTodos"
        ])
    },
    methods: {
        toggleCompleted(todo){
            todo.completed = !todo.completed;
            this.updateTodo(todo);
        },
        dynamicBackground(todo){
            return todo.completed ? 'success':'primary'
        }
        ,...mapActions([
        "getTodos","deleteTodo","updateTodo"
    ])},
    mounted() {
        this.getTodos();
    },
    components: { AddToDo, FilterToDos }
}
</script>

<style>

</style>