export class Messenger {
  port: number;
  
  constructor(port) {
    this.port = port;
  }

  messagePrint() {
    return `running at ${this.port}`
  }
}