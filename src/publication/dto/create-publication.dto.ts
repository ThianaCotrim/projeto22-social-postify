import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePublicationDto {

    @IsNotEmpty()
    @IsNumber()
    mediaId: number

    @IsNotEmpty()
    @IsNumber()
    postId: number

    @IsString()
    @IsNotEmpty()
    @IsDateString()
    date: string
}
