import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Prisma, ProjectRole } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma:PrismaService){}

  async create(createProjectDto: Prisma.ProjectCreateInput,userId: number) {
    const projectMember =  await this.prisma.$transaction(async (tx) => {
      const project = await tx.project.create({
        data:createProjectDto
      })

      return await tx.projectMembers.create({
        data:{
          projectId:project.id,
          userId:userId,
          role:ProjectRole.OWNER
        }
      })

    })

    const project = await this.prisma.project.findUnique({
      where:{id:projectMember.projectId}
    })

    return {projectMember,project}
  }

  findAll() {
    return `This action returns all project`;
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
