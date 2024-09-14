/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
    #arr = new Array()
    add(todo) {
        this.#arr.push(todo);
    }
    remove(ind) {
        if (ind >= this.#arr.length || ind < 0) return null;
        this.#arr.splice(ind, 1);
    }
    update(ind, todo) {
        if (ind >= this.#arr.length || ind < 0) return null;
        this.#arr[ind] = todo;
    }
    getAll() {
        return this.#arr;
    }
    get(ind) {
        if (ind >= this.#arr.length || ind < 0) return null;
        return this.#arr[ind];
    }
    clear() {
        this.#arr = [];
    }
}

module.exports = Todo;
