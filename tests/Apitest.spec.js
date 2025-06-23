import { test, expect, request } from '@playwright/test';

test('GET API - Fetch users list', async () => {
  const apiContext = await request.newContext({
    baseURL: 'https://reqres.in',
    extraHTTPHeaders: {
      'x-api-key': 'reqres-free-v1'  // optional if needed
    }
  });

  const response = await apiContext.get('/api/users?page=2');
  
  expect(response.ok()).toBeTruthy(); // Status code 200
  expect(response.status()).toBe(200);

  const data = await response.json();
  console.log(data); // Log response data

  expect(data).toHaveProperty('data');
  expect(Array.isArray(data.data)).toBe(true);
});