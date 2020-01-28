
import * as request from "supertest";
import App from "../src/app";

describe("Device Commandor API", () => {
  it("Register Device", async () => {
    const app = new App(0).app

    let response = await request(app).get("/commands").send()
    
    // List of registered commands
    let commands = response.body
    let registerCommand = commands.filter((c) => c.name === 'add')[0]
    expect(registerCommand).toBeDefined();
    expect(registerCommand.help).toBeDefined();
    
    response = await request(app).post("/commands").send({
      command: 'add',
      args: ['lamp']
    })
    let { id } = response.body;
    console.log('added lamp', id)
    expect(id).toBeDefined();

    // // Switch Lamp On
    // response = await request(app).post("/commands").send({
    //   command: "switch",
    //   args: [id, 'on']
    // })
  });
});
