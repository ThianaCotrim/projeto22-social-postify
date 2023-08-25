import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaModule } from '../src/prisma/prisma.module';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = await moduleFixture.resolve(PrismaService);

    await prisma.publication.deleteMany()
    await prisma.posts.deleteMany()
    await prisma.media.deleteMany()

    await app.init();
  });

  it("POST /medias", async () => {
    await request(app.getHttpServer())
      .post("/medias")
      .send({
        title: "Test",
        username: "Test"
      })
      .expect(201)

      const medias = await prisma.media.findMany();
    expect(medias).toHaveLength(1);

    const media = medias[0];
    expect(media).toEqual({
      id: expect.any(Number),
      title: "Test",
      username: "Test",
    });
  });
});
