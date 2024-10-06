import CustomNode from "../CustomNode";

class Queue<T = number> {
  first: CustomNode<T> | null = null;
  last: CustomNode<T> | null = null;
  length: number = 0;

  constructor(value: T) {
    this.enqueue(value);
  }

  enqueue = (value: T) => {
    const newNode = new CustomNode(value);

    if (!this.first) {
      this.first = this.last = newNode;
    } else {
      this.last!.next = newNode;
      this.last = newNode;
    }

    this.length++;
    return newNode;
  };

  dequeue = () => {
    if (!this.first) return null;

    const temp = this.first;
    this.first = this.first.next;
    temp.next = null;
    this.length--;

    if (this.length === 0) {
      this.last = null;
    }

    return temp;
  };
}

const queue = new Queue(5);
queue.enqueue(6);
queue.enqueue(7);
queue.enqueue(8);
queue.dequeue();
console.log(JSON.stringify(queue, null, 4));
