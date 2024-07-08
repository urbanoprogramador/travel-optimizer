import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('SeedController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/seed (GET)', () => {
    return request(app.getHttpServer())
      .get('/seed')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('status');
        expect(['seeded', 'already_seeded']).toContain(res.body.status);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
