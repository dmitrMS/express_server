import fetch from 'node-fetch';
import { cfg } from './config.js';

// test get method
test('get method: message: true', async () => {
  const response = await fetch(
    `http://localhost:${cfg.server.port}?message=true`
  );
  const json = await response.json();

  expect(json).toStrictEqual({ message: 'true' });
  expect(response.status).toStrictEqual(200);
});

test('get method: message: undefined', async () => {
  const response = await fetch(`http://localhost:${cfg.server.port}?`);
  const json = await response.json();

  expect(json).toStrictEqual({ error: "'undefined' was not provided" });
  expect(response.status).toStrictEqual(422);
});

// test post method
test('post method: message: "true"', async () => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ message: 'true' })
  };
  const response = await fetch(
    `http://localhost:${cfg.server.port}`,
    requestOptions
  );
  const json = await response.json();

  expect(json).toStrictEqual({ message: 'true' });
  expect(response.status).toStrictEqual(200);
});

test('post method: message: 123', async () => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ message: 123 })
  };
  const response = await fetch(
    `http://localhost:${cfg.server.port}`,
    requestOptions
  );
  const json = await response.json();

  expect(json).toEqual({ error: "'123' was not a string" });
  expect(response.status).toEqual(422);
});

test('post method: message: undefined', async () => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({})
  };
  const response = await fetch(
    `http://localhost:${cfg.server.port}`,
    requestOptions
  );
  const json = await response.json();

  expect(json).toEqual({ error: "'undefined' was not provided" });
  expect(response.status).toEqual(422);
});

test('post method: message: true', async () => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ message: true })
  };
  const response = await fetch(
    `http://localhost:${cfg.server.port}`,
    requestOptions
  );
  const json = await response.json();

  expect(json).toEqual({ error: "'true' was not a string" });
  expect(response.status).toEqual(422);
});
