import app from "../src/app";
import * as request from "supertest";

describe("GET /sayHello", () => {
  it("Hello", async () => {
    const result = await request(app).get("/sayHello");
    expect(result.text).toEqual("hello");
    expect(result.status).toEqual(200);
  });
});