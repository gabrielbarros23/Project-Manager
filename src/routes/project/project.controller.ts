import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UnauthorizedException, BadRequestException, ForbiddenException, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AddUserToProjectDto, CreateProjectDto, ModifyUserToProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UserService } from '../user/user.service';
import { ProjectRole } from 'src/generated/prisma/enums';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService,
    private readonly userService: UserService
  ) { }

  @Post()
  async create(@Request() request,
    @Body() createProjectDto: CreateProjectDto) {
    const userId = request.user.sub
    return await this.projectService.create(createProjectDto, userId);
  }

  @Post("add-user")
  async addUserToProject(@Request() request,
    @Body() body: AddUserToProjectDto) {
    const userId = request.user.sub
    const havePermission = await this.projectService.isOwnerOrAdminOfTheProject(userId, body.projectId)

    if (!havePermission) {
      throw new ForbiddenException("you don't have the permission to add a user in this project")
    }

    return await this.projectService.addUserToProject(body);
  }

  @Put("role")
  async modifyRole(@Request() request,
    @Body() body: ModifyUserToProjectDto) {
    const userId = request.user.sub
    const havePermission = await this.projectService.isOwnerOfTheProject(userId, body.projectId)

    if (!havePermission) {
      throw new ForbiddenException("you don't have the permission to modify a user in this project")
    }

    if (body.role === ProjectRole.OWNER) {
      throw new BadRequestException("you can't pass the creator role to another user")
    }

    return await this.projectService.modifyUserRoleToProject(body);
  }

  @Get()
  async findAll() {
    return await this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
