import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class PostsRepository {

    constructor(private readonly prisma: PrismaService){ }


  async create(createPostDto: CreatePostDto) {
   return this.prisma.posts.create({ data: createPostDto})
  }

  findAll() {
    return this.prisma.posts.findMany()
  }

  async findOne(id: number) {
    return await this.prisma.posts.findFirst({ where:{id}})
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}