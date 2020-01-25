import app from "../src/app";
import * as request from "supertest";

import { setupDB } from "./setup/db"

setupDB(process.env.DB_URL)

describe("Contacts API", () => {
  it("Creates New Contact", async () => {
    const response = await request(app).post("/contact").send({
      firstName: 'Zell',
      lastName: 'Bla'
    })
    let contact = response.body
    console.log(contact)
    expect(contact._id).toBeDefined();
    console.log(contact);
  });
});
