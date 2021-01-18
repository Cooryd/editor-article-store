import { Db } from "mongodb";
import changeService from "../../src/services/changes";

let insertMock = jest.fn().mockReturnValue(null);
let getMock = jest.fn().mockReturnValue(null);
jest.mock("../../src/repositories/changes", () => {
  return jest.fn().mockImplementation(() => ({
    insert: insertMock,
    get: getMock,
  }));
});

describe("articleService", () => {
  const db = ({} as unknown) as Db;

  beforeEach(async () => {
    jest.restoreAllMocks();
  });

  test("should not throw", () => {
    expect(() => {
      changeService(({} as unknown) as Db);
    }).not.toThrow();
  });

  test("Returns id if inserted", async () => {
    insertMock = jest.fn().mockReturnValue("507f1f77bcf86cd799439011");
    const insertedId = await changeService(db).registerChange({
      articleId: "123",
      applied: false,
      user: 'static-for-now',
      steps: [],
      path: 'abstract',
      timestamp: 1605198300275,
    });
    expect(insertedId).toBe("507f1f77bcf86cd799439011");
  });

  test("Returns list of changes", async () => {
    const change = {
      articleId: "1234",
      applied: false,
      user: 'static-for-now',
      path: 'abstract',
      timestamp: 1605198300275,
      steps: [
        {
          stepType: "replace",
          from: 121,
          to: 121,
          slice: {
            content: [
              {
                type: "text",
                text: "a",
              },
            ],
          },
        },
      ],
    };
    getMock = jest.fn().mockReturnValue([change]);
    const changes = await changeService(db).getChangesforArticle("1234");
    expect(changes).toEqual([change]);
  });
});