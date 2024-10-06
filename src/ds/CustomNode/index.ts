export default class CustomNode<T = number> {
  value: T | null = null;
  next: CustomNode<T> | null = null;
  prev: CustomNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
