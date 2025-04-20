import { test, expect } from "@playwright/test";

const api = "http://localhost:3000/api/todos";

test("POST then GET todos", async ({ request }) => {
  const title = `CI Todo ${Date.now()}`;

  // create
  const post = await request.post(api, {
    data: { title },
  });
  expect(post.ok()).toBeTruthy();

  // list
  const list = await request.get(api);
  const json = await list.json();
  expect(json).toEqual(
    expect.arrayContaining([expect.objectContaining({ title })])
  );
});
// test("POST with invalid data", async ({ request }) => {
//   const post = await request.post(api, {
//     data: { title: "" },
//   });
//   expect(post.status()).toBe(400);
//   const json = await post.json();
//   expect(json).toEqual(
//     expect.objectContaining({
//       fieldErrors: expect.objectContaining({
//         title: ["タイトルは必須です"],
//       }),
//     })
//   );
// });