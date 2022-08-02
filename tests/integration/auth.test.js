const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');

describe('auth middleware', () => {
  let server;
  let token;

  beforeEach(async () => {
    server = require('../../index');
    token = new User().generateAuthToken();
  });

  afterEach(async () => {
    await Genre.deleteMany({})
    await server.close();
  });


  const execute = async() => {
    return await request(server)
      .post('/api/genres')
      .set('a-auth-token', token)
      .send({ name: 'genre1' });
  };


  it('should return 401 if no token is provided', async () => {
    token = '';

    const res = await execute();

    expect(res.status).toBe(401);
  });

  it('should return 401 if an invalid token is provided', async () => {
    token = 'a';

    const res = await execute();

    expect(res.status).toBe(401);
  });

  it('should return 200 if token is valid', async () => {
    
    const res = await execute();

    expect(res.status).toBe(200);
  });
});