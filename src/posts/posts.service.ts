import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';


@Injectable()
export class PostsService {

  constructor(private readonly repository: PostsRepository){ }

  create(createPostDto: CreatePostDto) {

    const {title, text, image} = createPostDto

    if (!title || !text) throw new BadRequestException()

    return this.repository.create({title, text, image})
  }

  async findAll() {
    const arrayPost = await this.repository.findAll()
    if(arrayPost.length === 0) return []
    return arrayPost
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
