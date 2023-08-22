import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';

@Injectable()
export class MediasService {

  private medias: Media[]

  constructor(){
    this.medias = []
  }

  createMedia(CreateMediaDto: CreateMediaDto) {

    const {id, title, username} = CreateMediaDto;

    if(!title || !username) throw new BadRequestException('Title and username are required.')

    const sameCombination = this.medias.find(media => media.getTitle() === title && media.getUsername() === username);
    if(sameCombination) throw new ConflictException('A media with the same title and username already exists.')
    
    return this.medias.push(new Media((this.medias.length + 1), title, username))
  }

  findAllMedia() {

    if(this.medias.length === 0) return [];
    return this.medias
  }



  findOneMedia(id: number) {
    // const mediaId = this.medias.find(media => media.getId() === id);
    // if (!mediaId){
    //   throw new NotFoundException('Media not found.');
    // }

    // return {
    //   id: mediaId.getId(),
    //   title: mediaId.getTitle(),
    //   username: mediaId.getUsername(),
    // };
  }

  updateMedia(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  removeMedia(id: number) {
    return `This action removes a #${id} media`;
  }
}
