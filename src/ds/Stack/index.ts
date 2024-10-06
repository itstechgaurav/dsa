import CustomNode from "../CustomNode";

class Stack<T = number> {
  top: CustomNode<T> | null = null;
  length: number = 0;

  constructor(value: T) {
    this.push(value);
  }

  push = (value: T) => {
    const newNode = new CustomNode(value);

    if (!this.top) {
      this.top = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }

    this.length++;
    return newNode;
  };

  pop = () => {
    if (!this.top) return undefined;

    const temp = this.top;
    this.top = this.top.next;
    temp.next = null;
    this.length--;

    return temp;
  };
}

const ss = new Stack(5);
ss.push(6);
ss.push(7);
ss.pop();
ss.pop();

console.log(JSON.stringify(ss, null, 4));
