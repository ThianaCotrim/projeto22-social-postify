import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus, HttpCode, ParseIntPipe } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMedia(@Body() createMediaDto: CreateMediaDto) {
    return await this.mediasService.createMedia(createMediaDto);
  }


  @Get()
  async findAllMedia() {
    return this.mediasService.findAllMedia();
  }


  @Get(':id')
  async findOneMedia(@Param('id') id: number) {
    return await this.mediasService.findOneMedia(+id);
  }


  @Put(':id')
  async updateMedia(@Param('id') id: number, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediasService.updateMedia(+id, updateMediaDto);
  }


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeMedia(@Param('id', ParseIntPipe) id: number) {
    return this.mediasService.removeMedia(+id);
  }
}
