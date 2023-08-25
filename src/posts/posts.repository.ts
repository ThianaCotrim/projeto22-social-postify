import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class PostsRepository {

    constructor(private readonly prisma: PrismaService){ }

  async create(createPostDto: CreatePostDto) {
   return this.prisma.posts.create({ data: createPostDto})
  }


  async findAll() {
    return this.prisma.posts.findMany()
  }


  async findOne(id: number) {
    return await this.prisma.posts.findFirst({ where:{id}})
  }


  async update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.posts.update({
      where: {id},
      data: updatePostDto})
  }


  async remove(id: number) {
    return await this.prisma.posts.delete({where: {id}})
  }
}