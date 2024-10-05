/**
 * Operations to
 * - Push
 * - Pop
 * - Unshift
 * - Shift
 * - Get
 * - Set
 * - insert
 * - remove
 * - reverse
 */

import CustomNode from "../CustomNode";

export default class LinkedList<T = number> {
  private head: CustomNode<T> | null = null;
  private tail: CustomNode<T> | null = null;
  length: number = 0;

  constructor(value: T) {
    this.push(value);
  }

  push = (value: T) => {
    // Cases, 0 Node, 1 Node, 2+ Node
    const newNode = new CustomNode(value);

    // If Nothing Exits
    if (!this.head) {
      this.head = this.tail = newNode;
      this.length++;
      return newNode;
    }

    // If Atleast one node is there
    this.tail!.next = newNode;
    this.tail = newNode;
    this.length++;
  };

  pop = () => {
    // Case when there is no node
    if (!this.head) {
      return null;
    }

    // Case: When we have node
    // Find a node where pre is the 2nd last or last node and tmp is the last node
    let pre = this.head!;
    let tmp = this.head!;
    while (tmp.next) {
      pre = tmp;
      tmp = tmp.next;
    }

    // Case: When we have multiple nodes then it will remove the last one
    // Case: When we have only one node it will assign node to itself
    this.tail = pre;
    this.tail.next = null;
    this.length--;

    // Case When we have 0 node left then it will rest the head and tail back to null
    if (this.length === 0) {
      this.head = this.tail = null;
    }
  };

  /**
   * We need to add the node to the start of the linked list.
   * Cases:
   *  - When we don't have any node: then we can directly call push method
   *  - When we have node: then we need to point newNode.next to the head and head back to newNode
   */
  unshift = (value: T) => {
    if (!this.head) {
      return this.push(value);
    }

    const newNode = new CustomNode(value);
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
  };

  /**
   * We need to remove the node from the start of the linked list
   * Cases:
   * - We don't have any node: return null
   * - We have multiple node: move head to the next node
   * - we have one node: point head and tail to null
   */
  shift = () => {
    if (!this.head) {
      return null;
    }

    // Move the head to next node and decrement the length
    this.head = this.head.next;
    this.length--;

    // Check if the lined list is empty then point tail lalso to null
    if (this.length === 0) {
      this.tail = this.head;
    }
  };

  /**
   * We need to return the node at given index
   * Cases:
   *   - Given index is out of bound: then return null
   *   - Given index is withing bound: Then return the node at index
   */
  get = (index: number) => {
    if (index >= this.length || index < 0) {
      return null;
    }

    let tmp = this.head;
    for (let i = 0; i < index; i++) {
      tmp = tmp?.next ?? null;
    }

    return tmp;
  };

  set = (index: number, value: T) => {
    const node = this.get(index);

    if (node) {
      node.value = value;
    }
  };

  /**
   * We need to inser the node at the given index
   * Cases:
   *    - When then index = 0: Then it is a unshift operation
   *    - When the index = length: Then it is a push method
   *    - When the index > length & index < 0: Then it is a invalid case: return null in this case
   *    - When the index > 0 & index < length: Then We need to: Node.at(index - 1).next = newNode & newNode.next = Node.at(index)
   */
  insert = (index: number, value: T) => {
    // When then index = 0: Then it is a unshift operation
    if (index === 0) {
      return this.unshift(value);
    }

    // When the index = length: Then it is a push method
    if (index === this.length) {
      return this.push(value);
    }

    // When the index > length & index < 0: Then it is a invalid case: return null in this case
    if (index < 0 || index > this.length) {
      return false;
    }

    // When the index > 0 & index < length: Then We need to: Node.at(index - 1).next = newNode & newNode.next = Node.at(index)
    const prevNode = this.get(index - 1)!;
    const indexedNode = this.get(index)!;
    const newNode = new CustomNode(value);

    // Points node to the sequence
    prevNode.next = newNode;
    newNode.next = indexedNode;

    // Increment the length for the new node addition;
    this.length++;
  };

  /**
   * Remove the item from the given index
   * Caes:
   *   - Index = 0: Then it is a shift operation
   *   - Index = length - 1: Then it is a pop operation
   *   - Index < 0 | Index >= length: Then return false;
   *   - Index > 0 & Index < length -1: Then Node.at(index - 1).next = Node.at(index).next;
   */
  remove = (index: number) => {
    // Index = 0: Then it is a shift operation
    if (index === 0) {
      return this.shift();
    }

    // Index = length - 1: Then it is a pop operation
    if (index === this.length - 1) {
      return this.pop();
    }

    // Index < 0 | Index >= length: Then return false;
    if (index < 0 || index >= this.length) {
      return false;
    }

    // Index > 0 & Index < length -1: Then Node.at(index - 1).next = Node.at(index).next;
    const prevNode = this.get(index - 1)!;
    const indexedNode = this.get(index)!;
    prevNode.next = indexedNode.next;
    this.length--;
  };

  /**
   * We need to reverse the entire linked list
   * Steps:
   *   - Swap Head with tail
   *   - Iterate over the linked list and move the next to previous pointer white T != null
   * Cases:
   *   - If Linked list is empty: return
   *   - If There is one node then iterate over it
   */
  reverse = () => {
    if (this.length === 0) {
      return this;
    }

    // Swap Head with tail
    let temp = this.tail;
    this.tail = this.head;
    this.head = temp;

    let prev = null;
    temp = this.tail; // We need  to point it to the first node
    let next = temp;

    while (temp) {
      next = temp.next;
      temp.next = prev;
      prev = temp;
      temp = next;
    }

    return this;
  };
}

const list = new LinkedList("one");
list.pop();
list.push("one");
list.push("two");
list.push("three");
// list.insert(2, 5);
console.log(JSON.stringify(list, null, 2));
// list.reverse();
console.log(JSON.stringify(list, null, 2));
