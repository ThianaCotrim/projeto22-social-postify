import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationRepository } from './publication.repository';

@Injectable()

export class PublicationService {

  constructor(private readonly repository: PublicationRepository ){ }  

  async create(createPublicationDto: CreatePublicationDto) {
    
    const {mediaId, postId, date} = createPublicationDto

    if(!mediaId || !postId || !date) throw new BadRequestException()

    const media = this.repository.findOne(mediaId)
    const post = this.repository.findOne(postId)

    if(!media || !post) throw new NotFoundException()

    return this.repository.create({mediaId, postId, date})  
  }

  async findAll() {
    const arrayPublication = await this.repository.findAll()
    if(arrayPublication.length === 0) return []
    return arrayPublication
  }

  findOne(id: number) {
    return this.repository.findOne(id)
  }

  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return `This action updates a #${id} publication`;
  }

  remove(id: number) {
    return this.repository.remove(id)
  }
}
