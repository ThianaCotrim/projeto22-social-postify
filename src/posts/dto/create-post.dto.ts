import { IsNotEmpty, IsString, IsUrl } from "class-validator"

export class CreatePostDto {


    @IsString()
    @IsNotEmpty({
    message: 'All fields are required!',
    })
    title: string


    @IsString()
    @IsNotEmpty({
    message: 'All fields are required!',
    })
    text: string

    @IsString()
    @IsUrl()
    image: string

}
