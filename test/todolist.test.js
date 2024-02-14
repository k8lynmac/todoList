const Todo = require('../lib/todo');
const TodoList = require('../lib/todoList');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('toArray returns the list in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  })

  test('first returns the first todo in the list', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('last returns the last todo in the list', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('shift returns and removes the first todo in the list', () => {
    let todo = list.shift();
    expect(todo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('pop returns and removes the last todo in the list', () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('isDone returns true when all items are done, false otherwise', () => {
    expect(list.isDone()).toBe(false);
  });

  test('TypeError occurs when item that isnt a Todo object is added', () => {
    expect(() => list.add(1)).toThrow(TypeError);
    expect(() => list.add('hello')).toThrow(TypeError);
  });

  test('itemAt raises ReferenceError if index specified with no element', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(() => list.itemAt(3)).toThrow(ReferenceError)
  });

  test('markDoneAt marks true for specified position', () => {
    expect(() => list.markDoneAt(3)).toThrow(ReferenceError);

    list.markDoneAt(0);
    expect(todo1.isDone()).toEqual(true);
    expect(todo2.isDone()).toEqual(false);
    expect(todo3.isDone()).toEqual(false);
  });

  test('markUndoneAt marks false for specifed position', () => {
    expect(() => list.markUndoneAt(3).toThrow(ReferenceError));
    todo1.markDone();
    todo2.markDone();
    todo3.markDone();

    list.markUndoneAt(0);
    expect(todo1.isDone()).toEqual(false);
    expect(todo3.isDone()).toEqual(true);
    expect(todo2.isDone()).toEqual(true);
  })

  test('markAllDone marks all todos as done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toEqual(true);
    expect(todo2.isDone()).toEqual(true);
    expect(todo3.isDone()).toEqual(true);
    expect(list.isDone()).toBe(true);
  });

  test('removeAt specifies position and removes element from list', () => {
    expect(list.removeAt(2)).toEqual([todo3]);
    expect(list.toArray()).toEqual([todo1, todo2]);

    expect(() => list.removeAt(4)).toThrow(ReferenceError);
  });

  test('toString returns string reps of the list', () => {
    let string = `----Today's Todos----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('toString verifies the box is checked when a todo is completed', () => {
    list.markDoneAt(0);
    let string = `----Today's Todos----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('toString check for correct string when all todos are done', () => {
    list.markAllDone();
    let string = `----Today's Todos----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    expect(list.toString()).toBe(string);
    });

  test('forEach method iterates over each element in list', () => {
    let count = 0;
    list.forEach(todo => count++);
    expect(count).toEqual(3);
  }) 

  test('filter returns a new TodoList object', () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);
  
    expect(newList.title).toBe(list.title);
  
    let doneItems = list.filter(todo => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });
});