import request from "supertest";
import app from "../src/app";

describe("Auth Routes", () => {
  it("should return 400 for missing fields", async () => {
    const res = await request(app).post("/api/auth/register").send({});
    expect(res.status).toBe(400);
  });
});
