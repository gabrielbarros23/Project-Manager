import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './routes/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.service';
import { AuthModule } from './routes/auth/auth.module';
import { ProjectModule } from './routes/project/project.module';
import { TaskModule } from './routes/task/task.module';

@Module({
  imports: [
    UserModule, PrismaModule, AuthModule, ProjectModule,
    TaskModule, ConfigModule.forRoot({ isGlobal: true, })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
