import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createTaskDto: CreateTaskDto) {
    return await this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        dueDate: createTaskDto.dueDate,
        priority: createTaskDto.priority,
        project: createTaskDto.project,
        status: createTaskDto.status,
        signedTo: createTaskDto.signedTo ?
          {
            create: createTaskDto.signedTo.map(userID => ({
              user: {
                connect: { id: userID }
              }
            }
            ))

          } : undefined
      },
      include: { signedTo: true, project: true }
    })
    // return await this.prisma.task.create({ data: createTaskDto, include: { signedTo: true, project: true } })
  }

  async findAll() {
    const tasks = await this.prisma.task.findMany({ where: {} })
    const tasksMembers = await this.prisma.taskMembers.findMany({ where: {} })

    return { tasks, tasksMembers }
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
