import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('StationsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Seed the database before running tests
    await request(app.getHttpServer())
      .get('/seed')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('status');
        expect(['seeded', 'already_seeded']).toContain(res.body.status);
      });
  });

  it('/stations/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/stations/14')
      .send({ name: 'Test Station' })
      .expect(200)
      .expect({ status: 'ok' });
  });

  it('/stations (GET)', () => {
    return request(app.getHttpServer())
      .get('/stations')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  it('/stations/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/stations/10')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', 10);
        expect(res.body).toHaveProperty('name', 'Barcelona');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
