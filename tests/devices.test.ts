import app from "../src/app";
import * as request from "supertest";

describe("Device Commandor API", () => {
  it("Register Device", async () => {
    const response = await request(app).post("/command").send({
      command: 'add',
      args: ['lamp']
    })
    let { id } = response.body;
    console.log('added lamp', id)
    expect(id).toBeDefined();
  });
});
