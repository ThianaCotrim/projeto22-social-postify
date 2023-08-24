import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublicationRepository {

    constructor(private readonly prisma: PrismaService){ }

  async create(createPublicationDto: CreatePublicationDto) {
    return await this.prisma.publication.create({data: createPublicationDto})
  }

  findAll() {
    return this.prisma.publication.findMany()
  }

  async findOne(id: number) {
    return await this.prisma.publication.findFirst({where: {id}})
  }

  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return `This action updates a #${id} publication`;
  }

  remove(id: number) {
    return this.prisma.publication.delete({where: {id}})
  }
}