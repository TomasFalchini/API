const supertest = require("supertest");
const request = supertest("http://localhost:3001");
const jwt = require("jsonwebtoken");
const { faker } = require("@faker-js/faker");

//RECORDAR LEVANTAR EL MICROSERVICIO ANTES DE EJECUTAR LOS TESTS

describe("TESTING API", () => {
  beforeAll(() => {});
  afterEach(() => {});

  test("Res should be 200 if the user is new", async () => {
    const newUser = {
      mail: faker.internet.email(),
      password: "123234sdf",
    };
    const res = await request.post("/register").send(newUser);
    expect(res.status).toEqual(200);
  });

  test("Res should be 404 if the mail was already registered", async () => {
    const newUser = {
      mail: "tomasfalchini@gmail.com",
      password: "1234sdf",
    };
    const res = await request.post("/register").send(newUser);
    expect(res.status).toEqual(404);
  });

  test("Res should be 404 if there is something missing", async () => {
    const newUser = { mail: "randomUser123@gmail.com" };
    const res = await request.post("/register").send(newUser);
    expect(res.status).toEqual(404);
  });

  test('Response should be: "The user has been created"', async () => {
    const user = {
      mail: faker.internet.email(),
      password: "abcasdasdas",
    };
    const res = await request.post("/register").send(user);
    expect(res.body.result).toEqual("The user has been created");
  });

  test("Response should be a jwt", async () => {
    const user = {
      mail: "randomUser25000@gmail.com",
      password: "abcasdasdas",
    };
    const res = await request.post("/login").send(user);
    expect(typeof res.body.token).toBe("string");
    expect(res.body.token.length).toBeGreaterThan(100);
  });

  test("Response should be a valid jwt", async () => {
    const user = {
      mail: "randomUser25000@gmail.com",
      password: "abcasdasdas",
    };
    const res = await request.post("/login").send(user);
    expect(jwt.verify(res.body.token, "zGMRavsZf2KzjGtT6VgHf")).toBeDefined();
  });

  test("Status should be 401", async () => {
    const res = await request.get("/list");
    expect(res.status).toEqual(401);
  });

  test("Response must be Not authorized", async () => {
    const res = await request.get("/list");
    expect(res.body.error).toEqual("Not authorized");
  });

  //-----------------TEST E2E------------------------

  //RECORDAR LEVANTAR EL SEGUNDO MICROSERVICIO PARA PROBAR ESTE TEST

  test("Status should be 200 and must return the list of users", async () => {
    const newUser = {
      mail: faker.internet.email(),
      password: "1234556",
    };
    await request.post("/register").send(newUser);
    const token = await (await request.post("/login").send(newUser)).body.token;
    const res = await request
      .get("/list?page=1&userXpage=3")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body.users)).toBe(true);
    expect(res.body.users.length).toBe(3);
  });
});
