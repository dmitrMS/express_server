const fetch = require('node-fetch'); 

// test get method
test('test get method: message: true', async () => {
  try {
    const response = await fetch('http://localhost:8000?message=true');
    const json = await response.json();

    expect(json).toStrictEqual({ message: 'true' });
    expect(response.status).toStrictEqual(200);
  } catch (error) {
    expect(error).toMatch('error');
  }
  });

test('test get method: message: undefined', async () => {
  try {
    const response = await fetch('http://localhost:8000?');
    const json = await response.json();

    expect(json).toStrictEqual({ "error": "'undefined' was not provided" });
    expect(response.status).toStrictEqual(422);
  } catch (error) {
    expect(error).toMatch('error');
  }
  });

// test post method  
test('test post method: message: true', async () => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ message:"true" }),
    };
    const response = await fetch('http://localhost:8000',requestOptions );
    const json = await response.json();

    expect(json).toStrictEqual({ message: 'true' });
    expect(response.status).toStrictEqual(200);
  } catch (error) {
    expect(error).toMatch('error');
  }
  });

test('test post method: message: 123', async () => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ message:123 }),
    };
    const response = await fetch('http://localhost:8000',requestOptions );
    const json = await response.json();

    expect(json).toEqual({ "error": "'123' was not a string" });
    expect(response.status).toEqual(422);
  } catch (error) {
    expect(error).toEqual("error");
  }
  });

test('test post method: message: undefined', async () => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ }),
    };
    const response = await fetch('http://localhost:8000',requestOptions );
    const json = await response.json();
    console.log(json);

    expect(json).toEqual({ "error": "'undefined' was not provided"});
    expect(response.status).toEqual(422);
  } catch (error) {
    console.log(error);
    expect(error).toEqual("error");
  }
  });
