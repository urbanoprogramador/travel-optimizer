import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('PathsController (e2e)', () => {
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

    await request(app.getHttpServer())
      .get('/seed/paths')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('status');
        expect(['seeded', 'already_seeded']).toContain(res.body.status);
      });
  });

  it('/paths/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/paths/5')
      .send({ sourceId: 10, destinationId: 11, cost: 30 })
      .expect(200)
      .expect({ status: 'ok' });
  });

  it('/paths (GET)', () => {
    return request(app.getHttpServer())
      .get('/paths')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
