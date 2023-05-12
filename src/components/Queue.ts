export class Queue<T> {
  limit: number;
  queue: T[];

  constructor(limit?: number) {
    this.limit = limit ?? -1;
    this.queue = []
  }

  push(...items: T[]): T[] {
    items.forEach(item => this.queue.push(item));
    if (this.limit < 0) { return []; }
    const popped = [] as T[];
    while (this.queue.length > this.limit) {
      popped.push(this.queue.shift() as T);
    }
    return popped;
  }

  pop(): T | undefined {
    return this.queue.shift();
  }

  size(): number {
    return this.queue.length;
  }

  array(): T[] {
    return this.queue;    
  }
}
78