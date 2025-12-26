import request from 'supertest';
import app from '../../../src/app.js';
import { cleanDatabase, closeDatabase } from '../../helpers/setup.js';

describe('Register test', () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('should register a new user and return success response', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'yamila@mail.com',
        password: '123456',
      });

    expect(res.statusCode).toBe(201);
    //expect(res.body).toHaveProperty('message', 'User registered correctly');
   // expect(res.body.user).toHaveProperty('email', 'yamila@mail.com');
  });

});