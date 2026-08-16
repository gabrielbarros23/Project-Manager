import { IsString, Length, MinLength } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @Length(3,50)
    title:string

    @IsString()
    @Length(3,200)
    description:string
}
