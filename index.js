Vue.component('add-todo', {
    template:
    `
    <div class="add-item">
        <form @submit.prevent="addItem">
            <h3>Add To-Do Item</h3>
            <input v-model="item" required>
            <button>Submit</button>
        </form>
    </div>
    `,
    data() {
        return {
            item: ''
        }
    },
    methods: {
        addItem() {
            this.$emit('add-item', this.item)
            this.item = ''
        }
    }
})

Vue.component('todo-item', {
    props: {
        count: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    template:
    `
    <div class="todo-items">
        <div class="row">
            <div class="col-1-10">
                <div class="center">
                    <input type="checkbox" @click="completedTask">
                </div>
            </div>
            <div class="col-7-10">
                <h3>Item {{ count + 1 }}</h3>
                <p v-show="!edit" @click="editTask">{{ description }}</p>
                <input v-show="edit" v-model="description" @keyup.enter="editTask">
            </div>
            <div class="col-2-10">
                <div class="center">
                    <button @click="editTask">{{ edit ? "Done" : "Edit" }}</button>
                    <button @click="deleteTask" id="deleteButton">Delete</button>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            edit: false
        }
    },
    methods: {
        completedTask() {
            this.$emit('complete-task', this.index);
        },
        deleteTask() {
            this.$emit('remove-task', this.index);
        },
        editTask() {
            this.edit = !this.edit;
            if (!this.edit) {
                this.$emit('edit-task', this.description, this.index);
            }
            
        }
    }
})

Vue.component("completed-todos", {
    props: {
        count: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    }, 
    template:
    `
    <div class="todo-items">
        <div class="row">
            <div class="col-1-10">
                <div class="center">
                    <input type="checkbox" @click="addBack">
                </div>
            </div>
            <div class="col-7-10">
                <h3>Item {{ count + 1 }}</h3>
                <p class="completed">{{ description }}</p>
            </div>
            <div class="col-2-10">
                <div class="center">
                    <button @click="deleteTask">Delete</button>
                </div>
            </div>
        </div>
    </div>
    `,
    methods: {
        addBack() {
            this.$emit('add-todo-back', this.index);
        },
        deleteTask() {
            this.$emit('remove-task-from-completed', this.index);
        }
    }
})


var app = new Vue({
    el: '#app',
    data: {
        count: 0,
        todos: [],
        completed: []
    },
    methods: {
        addTodo(item) {
            this.todos.push({"count": this.count, "item": item, "done": false});
            this.count++;
        },
        completeTodo(index) {
            this.todos[index].done = true;
            this.completed.push(this.todos[index]);
            this.todos.splice(index, 1);
        },
        addTodoBack(index) {
            this.completed[index].done = false;
            this.todos.push(this.completed[index]);
            this.completed.splice(index, 1);
        },
        deleteTodo(index) {
            this.todos.splice(index, 1);
        },
        deleteTodoFromCompleted(index) {
            this.completed.splice(index, 1);
        },
        editTodo(description, index) {
            this.todos[index].item = description;
        }
    }
})