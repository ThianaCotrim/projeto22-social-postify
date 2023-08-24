import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MediasRepository   {

  constructor(private readonly prisma: PrismaService){ }


  createMedia(CreateMediaDto: CreateMediaDto) {

    return this.prisma.media.create({ data: CreateMediaDto })
    
  }


  async checkTitleAndUsername (title: string, username: string){
    return await this.prisma.media.findFirst({ where: {title, AND: {username}}})
  }


  async findAllMedia() {

    return this.prisma.media.findMany()
  }


 async findOneMedia(id: number) {
    return this.prisma.media.findFirst({ where: {id}})

  };
  

  async updateMedia(id: number, updateMediaDto: UpdateMediaDto) {

    return await this.prisma.media.update({
        where: {id},
        data: updateMediaDto,
    })
  };


  async removeMedia(id: number) {
    return await this.prisma.media.delete({ where: {id} })
  };
}