import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from '@prisma/client';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {

  constructor(private readonly repository: MediasRepository){ }


  async createMedia(CreateMediaDto: CreateMediaDto) {
    
    const {title, username}   = CreateMediaDto

     if(!title || !username) throw new BadRequestException('Title and username are required.')
     const MediaExis = await this.repository.checkTitleAndUsername(title, username)
    if (MediaExis) throw new ConflictException() 

  return await this.repository.createMedia({title, username})
  };



  async findAllMedia() {

    const arrayMedia = await this.repository.findAllMedia()
    if(arrayMedia.length === 0){
    return []
    }
    return arrayMedia
  };



  async findOneMedia(id: number) {
    const media = await this.repository.findOneMedia(id)
    if (!media) throw new NotFoundException();
    return media

  };
    


  async updateMedia(id: number, updateMediaDto: UpdateMediaDto) {
    const {title, username } = updateMediaDto
    const media = await this.repository.findOneMedia(id)
    if(!media) throw new NotFoundException()

    const MediaExis = await this.repository.checkTitleAndUsername(title, username)
    if (MediaExis) throw new ConflictException() 

    return this.repository.updateMedia(id, updateMediaDto)
  };



  async removeMedia(id: number) {

    const media = await this.repository.findOneMedia(id)
    if(!media) throw new NotFoundException()

    return this.repository.removeMedia(id)
  };
}
