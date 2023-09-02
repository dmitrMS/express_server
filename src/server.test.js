const fetch = require('node-fetch'); 

// test get method
test('test get method: success story', async () => {
  try {
    const response = await fetch('http://localhost:8000?message=true');
    const json = await response.json();

    expect(json).toStrictEqual({ message: 'true' });
    expect(response.status).toStrictEqual(200);
  } catch (error) {
    expect(error).toMatch('error');
  }
  });

// test post method  
test('test post method: success story', async () => {
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
