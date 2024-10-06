import CustomNode from "../CustomNode";

class DoublyLinkedList<T = number> {
  head: CustomNode<T> | null = null;
  tail: CustomNode<T> | null = null;
  length: number = 0;

  constructor(value: T) {
    this.push(value);
  }

  push = (value: T) => {
    const newNode = new CustomNode(value);

    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
  };

  pop = () => {
    if (!this.head) return false;

    const temp = this.tail!.prev!;
    this.tail = temp;
    this.length--;

    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
  };

  unshift = () => {
    if (!this.head) {
      return null;
    }

    this.head = this.head.next;
    this.length--;

    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
  };

  shift = (value: T) => {
    const newNode = new CustomNode(value);

    newNode.next = this.head;

    if (this.head) {
      this.head!.prev = newNode;
      this.head = newNode;
    } else {
      this.head = this.tail = newNode;
    }

    this.length++;
  };

  get = (index: number) => {
    if (index < 0 || index >= this.length) return null;

    const mid = parseInt((this.length / 2).toString());
    let temp = this.head;

    // First half of the linked list
    if (mid > index) {
      for (let i = 0; i < index; i++) {
        temp = temp?.next ?? null;
      }
    } else {
      // Second half of the linked list
      temp = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        temp = temp?.prev ?? null;
      }
    }

    return temp;
  };

  set = (index: number, value: T) => {
    const node = this.get(index);

    if (node) {
      node.value = value;
      return true;
    }

    return false;
  };

  insert = (index: number, value: T) => {
    if (index < 0 || index > this.length) return null;

    if (index === 0) {
      return this.shift(value);
    }

    if (index === this.length) {
      return this.push(value);
    }

    const afterNode = this.get(index)!;
    const prevNode = afterNode.prev!;
    const newNode = new CustomNode(value);

    prevNode.next = newNode;
    newNode.prev = prevNode;
    newNode.next = afterNode;
    afterNode.prev = newNode;

    this.length++;
  };

  remove = (index: number) => {
    if (index === 0) return this.unshift();
    if (index === this.length - 1) return this.pop();
    if (index < 0 || index >= this.length) return null;

    const nodeToRemove = this.get(index)!;
    const prevNode = nodeToRemove.prev!;
    const afterNode = nodeToRemove.next!;

    prevNode.next = afterNode;
    afterNode.prev = prevNode;
    this.length--;
  };
}

const ll = new DoublyLinkedList(5);
ll.push(6);
ll.push(7);
ll.push(8);
ll.push(9);
ll.push(10);
ll.push(11);
console.log(ll);
