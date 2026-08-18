import { IsEnum, IsInt, IsNotEmpty, IsPositive, IsString, Length, MinLength } from "class-validator";
import { ProjectRole } from "src/generated/prisma/enums";

export class CreateProjectDto {
  @IsString()
  @Length(3, 50)
  title: string

  @IsString()
  @Length(3, 200)
  description: string
}

export class AddUserToProjectDto {
  @IsInt()
  @IsPositive()
  userId: number

  @IsInt()
  @IsPositive()
  projectId: number

  @IsEnum(ProjectRole)
  @IsNotEmpty()
  role: ProjectRole
}

export class ModifyUserToProjectDto {
  @IsInt()
  @IsPositive()
  userId: number

  @IsInt()
  @IsPositive()
  projectId: number

  @IsEnum(ProjectRole)
  @IsNotEmpty()
  role: ProjectRole
}
