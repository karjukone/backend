import request from "supertest";
import app from '../src/app';
import closePool from '../src/utils/database';


afterAll(async () => {
    n
})

describe('GET /api/v1/cats', () =>{
    it('Should do somethign with cats', async () => {
        const res = await request(app)
        .get('/api...')
        .set('Accept', 'application/json');
      expect(res.statusCode).toEqual(200);
      expect(res.bosy).toBeInstanceOff(Array);  
    });

    it('should return cat by id', async () => {
        const res = await request(app)
        .get('/api/v1/cats/1')
        .set('Accept', 'application/json');
      expect(res.statusCode).toEqual(200);
      expect(res.bosy).toBeInstanceOff();  
    });


 describe('Test User endpoints', () => {

   describe('POST /api/v1/users', () => {
     it('should create a new user', async () => {
       const newUser = {
         name: 'Test User',
         username: 'testuser',
         email: 'testuser@example.com',
         role: 'user',
         password: 'password123',
       };
       const res = await request(app)
         .post('/api/v1/users')
         .send(newUser)
         .set('Accept', 'application/json');
       // TODO: add all relevant assertions here
       expect(res.statusCode).toEqual(201);
       expect(res.body).toHaveProperty('result');
       expect(res.body.result.user_id).toBeDefined();
     });
   });

   describe('GET /api/v1/users', () => {
     it('should return a list of users', async () => {
       const res = await request(app)
         .get('/api/v1/users')
         .set('Accept', 'application/json');
       expect(res.statusCode).toEqual(200);
       expect(res.body).toBeInstanceOf(Array);
     });
   });

 });

 describe('Test Authentication endpoints', () => {
   let token;
   describe('POST /api/v1/auth/login', () => {
     it('should login a user and return a token', async () => {
       const user = {
         username: 'testuser',
         password: 'password123',
       };
       const res = await request(app)
         .post('/api/v1/auth/login')
         .send(user)
         .set('Accept', 'application/json');
       // TODO: add all relevant assertions here
       expect(res.statusCode).toEqual(200);
       expect(res.body).toHaveProperty('user');
       expect(res.body.token).toBeDefined();
       token = res.body.token;
     });
   });

   describe('GET /api/v1/auth/me', () => {
     it('should return a list of users', async () => {
       const res = await request(app)
         .get('/api/v1/auth/me')
         .set('Authorization', `Bearer ${token}`)
         .set('Accept', 'application/json');
       // TODO: add all relevant assertions here
       expect(res.statusCode).toEqual(200);
       expect(res.body).toHaveProperty('user');
     });
   });
 });
});