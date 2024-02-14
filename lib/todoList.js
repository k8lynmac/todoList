// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.
const Todo = require('./todo.js');

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError('can only add Todo objects');
    }
    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[(this.todos.length) - 1];
  }

  itemAt(position) {
    if (!(position in this.todos)) {
      throw new ReferenceError(`Invalid index: ${position}`);
    }
    return this.todos[position];
  }

  markDoneAt(position) {
    this.itemAt(position).markDone();
  }

  markUndoneAt(position) {
    this.itemAt(position).markUndone();
  }

  isDone() {
    return this.todos.every(itemObj => itemObj.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(position) {
    this.itemAt(position);
    let deleted = this.todos.splice(position, 1);
    return deleted;
  }

  toString() {
    let title = `----${this.title}----`;
    let items = this.todos.map(item => item.toString()).join('\n');
    return `${title}\n${items}`;
  }

  forEach(callback){
    this.todos.forEach(callback);
  }
  
  filter(callback) {
    let newList = new TodoList(this.title);
    this.forEach(todo => {
      if (callback(todo)) {
        newList.add(todo);
      }
    });

    return newList;
  }

  //Returns the first Todo object from the list that matches the string title. Returns undefined if there is no such todo.
  findByTitle(titles) {
   return list.filter(item => item.getTitle() === titles).first();
  }

  //Returns a new TodoList object that contains all of the done todos.
  allDone() {
    return this.filter(todo => todo.isDone());
  }
  //Returns a new TodoList object that contains all of the undone todos.
  allNotDone() {
    return this.filter(todo => !(todo.isDone()));
  }

  //Mark the first Todo object on the list that matches the string title as done. 
  //Do nothing if there are no matching todos on the list.
  markDone(title) {
    let obj = this.findByTitle(title);
    if (obj !== undefined) {
      obj.markDone();
    }
  }

   //Mark every todo on the list as done.
  markAllDone() {
    this.forEach(todo => todo.markDone());
   }
  //Mark every todo on the list as not done.
  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  //return a copy of the array of Todo items
  toArray() {
    return this.todos.slice();
  }

}


module.exports = TodoList;

// let todo1 = new Todo("Buy milk");
// let todo2 = new Todo("Clean room");
// let todo3 = new Todo("Go to the gym");
// let todo4 = new Todo("Go shopping");
// let todo5 = new Todo("Feed the cats");
// let todo6 = new Todo("Study for Launch School");
// let list = new TodoList("Today's Todos");

// list.add(todo1);
// list.add(todo2);
// list.add(todo3);
// list.add(todo4);
// list.add(todo5);
// list.add(todo6);
// todo1.markDone();
// todo5.markDone();

// let doneTodos = list.filter(todo => todo.isDone());
// console.log(doneTodos);
// console.log(list.filter(todo => todo.isDone()));
// console.log(list.filter(todo => todo.isDone()).first());
// console.log(list.findByTitle(`Clean room`));
// console.log(list.allDone());
// console.log(list.allNotDone());