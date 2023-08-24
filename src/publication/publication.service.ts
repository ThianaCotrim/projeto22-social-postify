import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationRepository } from './publication.repository';
import dayjs from 'dayjs';

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

  async findOne(id: number) {
    const publication = await this.repository.findOne(id)
    if(!publication) throw new NotFoundException()
    return publication
    
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {

    const { mediaId, postId, date } = updatePublicationDto;

    const publication = await this.repository.findOne(id);
    if (!publication) throw new NotFoundException();

    const media = await this.repository.findOne(mediaId);
    const post = await this.repository.findOne(postId);
    if (!post || !media) throw new NotFoundException()

    const currentDate = new Date(Date.now());
      const isPassed = dayjs(currentDate).isAfter(publication.date)

    if (isPassed) throw new ForbiddenException();

    return this.repository.update(id, updatePublicationDto)
  }

  async remove(id: number) {
    const publication = await this.repository.findOne(id)
    if(!publication) throw new NotFoundException()

    return this.repository.remove(id)
  }
}
