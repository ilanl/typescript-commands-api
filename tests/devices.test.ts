
import * as request from "supertest";
import App from "../src/app";

const help = async (app) => {
  return await request(app).get("/commands").send()
}

const add = async (app, deviceTypes) => {
  const response = await request(app).post("/commands").send({
    command: 'add',
    args: deviceTypes
  })
  return response
}

const list = async (app, filterTypes) => {
  const response = await request(app).post("/commands").send({
    command: 'list',
    args: ['--only'].concat(filterTypes)
  })
  return response
}

const power = async (app, deviceId, state) => {
  const response = await request(app).post("/commands").send({
    command: 'switch',
    args: [state, deviceId]
  })
  return response
}

describe.each([
  ['add'],
  ['switch']
])('.command manual', (a) => {
  const app = new App(0).app

  it(`registered ${a}`, async () => {
    const response = await help(app)
    const data = JSON.parse(response.text)
    const cmd = data.filter((c) => c.name === 'add')[0]
    expect(cmd).toBeDefined();
    expect(cmd.help).toBeDefined();
  });
});

describe("bad command parameters", () => {
  const app = new App(0).app;
  it(".unrecognized command", async () => {
    const response = await request(app).post("/commands").send({
      command: 'foo'
    })
    const status = response.status;
    expect(status).toEqual(403);

    const message = response.body;
    expect(message).toEqual("COMMAND_NOT_RECOGNIZED");
  });
})

describe(". basic scenario - turn on all devices", () => {
  const app = new App(0).app;
  const deviceTypes = ['lamp', 'lamp', 'airconditioner'];

  it(".add devices", async () => {
    const response = await add(app, deviceTypes);
    const ids = response.body;
    expect(ids).toHaveLength(deviceTypes.length);
  });

  it(".list devices", async () => {
    const response = await list(app, []);
    const devices = response.body;
    expect(devices).toHaveLength(deviceTypes.length);
  });

  it(".list devices with parameter", async () => {
    const distinctTypes = deviceTypes.filter((n, i) => deviceTypes.indexOf(n) === i);
    const response = await list(app, distinctTypes);
    const devices = response.body;
    expect(devices).toHaveLength(deviceTypes.length);
  });

  it(".turn devices on | off", async () => {
    let response = await list(app, [])
    let devices = response.body;
    const deviceId = devices[0]._id;

    response = await power(app, deviceId, 'on');

    response = await list(app, [])
    devices = response.body;
    devices = devices.filter((d) => d._id === deviceId);
    expect(devices[0].state).toEqual('on');

    response = await power(app, deviceId, 'off');

    response = await list(app, [])
    devices = response.body;

    devices = devices.filter((d) => d._id === deviceId);
    expect(devices[0].state).toEqual('off');
  });
});