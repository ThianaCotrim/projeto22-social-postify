import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaModule } from '../src/prisma/prisma.module';
import {faker} from '@faker-js/faker'


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

//MEDIAS
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


  it('GET /medias', async () => {
    await prisma.media.create({
      data: {
        title: "Test",
        username: "Test"
      }
    });

    let response = await request(app.getHttpServer()).get('/medias');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });


  it("GET /medias/id", async () => {
    const createdMedia = await prisma.media.create({
      data: {
        title: "Test",
        username: "Test",
      },
    });
  
    const response = await request(app.getHttpServer()).get(`/medias/${createdMedia.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: createdMedia.id,
      title: "Test",
      username: "Test",
    });
  });


  it("PUT /medias/id", async () => {
    const createdMedia = await prisma.media.create({
      data: {
        title: "Original Title",
        username: "Test",
      },
    });
  
    const updatedTitle = "Updated Title";
    const response = await request(app.getHttpServer())
      .put(`/medias/${createdMedia.id}`)
      .send({
        title: updatedTitle,
      })
      .expect(200);
    expect(response.body).toEqual({
      id: createdMedia.id,
      title: updatedTitle,
      username: "Test",
    });
  
    const updatedMedia = await prisma.media.findUnique({
      where: { id: createdMedia.id },
    });
    expect(updatedMedia.title).toBe(updatedTitle);
  });


  it("DELETE /medias/id", async () => {

    const createdMedia = await prisma.media.create({
      data: {
        title: "Test",
        username: "Test",
      },
    });
  
    await request(app.getHttpServer())
      .delete(`/medias/${createdMedia.id}`)
      .expect(204);

    const deletedMedia = await prisma.media.findUnique({
      where: { id: createdMedia.id },
    });
    expect(deletedMedia).toBeNull();
  });



// POSTS 
it("POST /posts", async () => {
  await request(app.getHttpServer())
    .post("/posts")
    .send({
      title: "Test",
      text: "Test",
      image: "Test"
    })
    .expect(201)

    const posts = await prisma.posts.findMany();
  expect(posts).toHaveLength(1);

  const post = posts[0];
  expect(post).toEqual({
    id: expect.any(Number),
    title: "Test",
    text: "Test",
    image: "Test",
  });
});


it('GET /posts', async () => {
  await prisma.posts.create({
    data: {
      title: "Test",
      text: "Test",
      image: "Test",
    }
  });

  let response = await request(app.getHttpServer()).get('/posts');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveLength(1);
});


it("GET /posts/id", async () => {
  const createdPost = await prisma.posts.create({
    data: {
      title: "Test",
      text: "Test",
      image: "Test",
    },
  });

  const response = await request(app.getHttpServer()).get(`/posts/${createdPost.id}`);
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({
    id: createdPost.id,
    title: "Test",
    text: "Test",
    image: "Test"
  });
});


it("PUT /posts/id", async () => {
  const createdPosts = await prisma.posts.create({
    data: {
      title: "Original Title",
      text: "Test",
      image: "Test"
    },
  });

  const updatedTitle = "Updated Title";
  const response = await request(app.getHttpServer())
    .put(`/posts/${createdPosts.id}`)
    .send({
      title: updatedTitle,
    })
    .expect(200);
  expect(response.body).toEqual({
    id: createdPosts.id,
    title: updatedTitle,
    text: "Test",
    image: "Test",
  });

  const updatedPosts = await prisma.posts.findUnique({
    where: { id: createdPosts.id },
  });
  expect(updatedPosts.title).toBe(updatedTitle);
});


it("DELETE /posts/id", async () => {
  const createdPost = await prisma.posts.create({
    data: {
      title: "Test",
      text: "Test",
      image: "Test",
    },
  });

  const response = await request(app.getHttpServer()).delete(`/posts/${createdPost.id}`);
  expect(response.statusCode).toBe(204);

  const getResponse = await request(app.getHttpServer()).get(`/posts/${createdPost.id}`);
  expect(getResponse.statusCode).toBe(404);
})


//PUBLICATION

it("POST /publication", async () => {
  const media = await prisma.media.create({
    data: {
      title: faker.company.name(),
      username: faker.person.lastName()
    }
  })

  const post = await prisma.posts.create({
    data: {
      title: faker.company.name(),
      text: faker.company.catchPhrase(),
      image: faker.company.name(),
    }
  })

  await request(app.getHttpServer())
    .post('/publication')
    .send({
      mediaId: media.id,
      postId: post.id,
      date: new Date(faker.date.future())
    })
    .expect(201)
})


it("GET /publication", async () => {
  const media = await prisma.media.create({
    data: {
      title: faker.company.name(),
      username: faker.person.lastName()
    }
  })

  const post = await prisma.posts.create({
    data: {
      title: faker.company.name(),
      text: faker.company.catchPhrase(),
      image: faker.company.name(),
    }
  })

  await prisma.publication.create({
    data: {
      postId: post.id,
      mediaId: media.id,
      date: new Date(Date.now()).toISOString()
    }
  })

  let response = await request(app.getHttpServer()).get('/publication')
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveLength(1)
})


it("GET /publication/id", async () => {
  const media = await prisma.media.create({
    data: {
      title: faker.company.name(),
      username: faker.person.lastName()
    }
  })

  const post = await prisma.posts.create({
    data: {
      title: faker.company.name(),
      text: faker.company.catchPhrase(),
      image: faker.company.name(),
    }
  })

  const publication = await prisma.publication.create({
    data: {
      postId: post.id,
      mediaId: media.id,
      date: new Date(Date.now()).toISOString()
    }
  })

  let response = await request(app.getHttpServer()).get(`/publication/${publication.id}`)
  expect(response.statusCode).toBe(200);
  expect(response.body.postId).toBe(publication.postId)
  expect(response.body.mediaId).toBe(publication.mediaId)
})


it("PUT /publication/id", async () => {

});


it("DELETE /publication/id", async () => {
  const media = await prisma.media.create({
    data: {
      title: faker.company.name(),
      username: faker.person.lastName()
    }
  })

  const post = await prisma.posts.create({
    data: {
      title: faker.company.name(),
      text: faker.company.catchPhrase(),
      image: faker.company.name(),
    }
  })

  const publication = await prisma.publication.create({
    data: {
      postId: post.id,
      mediaId: media.id,
      date: new Date(faker.date.future())
    }
  })

  let response = await request(app.getHttpServer())
    .delete(`/publication/${publication.id}`)
  expect(response.statusCode).toBe(200);
})


})
