import { Injectable } from '@nestjs/common';
import { AddUserToProjectDto, CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Prisma, ProjectRole } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createProjectDto: Prisma.ProjectCreateInput, userId: number) {
    return await this.prisma.project.create({
      data: {
        title: createProjectDto.title,
        description: createProjectDto.description,
        members: {
          create: {
            role: ProjectRole.OWNER,
            user: {
              connect: { id: userId }
            }
          }
        }
      },
      include: { members: true }
    })

  }

  async addUserToProject(data: AddUserToProjectDto) {
    return await this.prisma.projectMembers.create({
      data: {
        role: data.role,
        projectId: data.projectId,
        userId: data.userId,
      },
    })
  }

  async modifyUserRoleToProject(data: AddUserToProjectDto) {
    return await this.prisma.projectMembers.update({
      where: {
        userId_projectId: { userId: data.userId, projectId: data.projectId }
      },
      data: {
        role: data.role,
      },
    })
  }

  async isOwnerOrAdminOfTheProject(userId: number, projectId: number) {
    return await this.prisma.projectMembers.findUnique({
      where: {
        userId_projectId: { userId: userId, projectId: projectId },
        OR: [
          { role: ProjectRole.OWNER },
          { role: ProjectRole.ADMIN }
        ]

      }
    })

  }

  async isOwnerOfTheProject(userId: number, projectId: number) {
    return await this.prisma.projectMembers.findUnique({
      where: {
        userId_projectId: { userId: userId, projectId: projectId },
        role: ProjectRole.OWNER
      }
    })

  }

  async findAll() {
    return await this.prisma.project.findMany({
      where: {},
      include:{members:true,tasks:true}
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
