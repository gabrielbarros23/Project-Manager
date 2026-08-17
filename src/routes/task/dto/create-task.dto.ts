import { Type } from "class-transformer";
import { IsDate, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Length, ValidateNested } from "class-validator";
import { TaskPriority } from "src/generated/prisma/enums";

class ProjectConnectDTO {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  id: number;
}

class ProjectRelationInputDTO {
  @ValidateNested()
  @Type(() => ProjectConnectDTO)
  @IsNotEmpty()
  connect: ProjectConnectDTO
}

class UserIDtDTO {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  id: number;
}

class UserCreateByIDtDTO {
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => UserIDtDTO)
  connect: UserIDtDTO;
}

class UserConnectDTO {
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => UserCreateByIDtDTO)
  user: UserCreateByIDtDTO;
}

class UserRelationInputDTO {
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => UserConnectDTO)
  create: UserConnectDTO
}

export class CreateTaskDto {
  @IsString()
  @Length(3, 50)
  title: string

  @IsString()
  @Length(3, 200)
  description: string

  @IsNotEmpty()
  @IsEnum(TaskPriority)
  priority: TaskPriority

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dueDate: string

  @ValidateNested()
  @Type(() => ProjectRelationInputDTO)
  @IsNotEmpty()
  project: ProjectRelationInputDTO

  @IsOptional()
  signedTo: UserRelationInputDTO
}
