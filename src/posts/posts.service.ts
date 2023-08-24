import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';


@Injectable()
export class PostsService {

  constructor(private readonly repository: PostsRepository){ }

 async create(createPostDto: CreatePostDto) {

    const {title, text, image} = createPostDto

    if (!title || !text) throw new BadRequestException()

    return this.repository.create({title, text, image})
  }

 async findAll() {
    const arrayPost = await this.repository.findAll()
    if(arrayPost.length === 0) return []
    return arrayPost
  }

 async findOne(id: number) {
    const post = await this.repository.findOne(id)
    if(!post) throw new NotFoundException()
    return post
  }

 async update(id: number, updatePostDto: UpdatePostDto) {

    const post = await this.repository.findOne(id)
    if(!post) throw new NotFoundException()

    return await this.repository.update(id, updatePostDto)
  }

 async remove(id: number) {
    const post = await this.repository.findOne(id)
    if(!post) throw new NotFoundException()

    return this.repository.remove(id)
  }
}
