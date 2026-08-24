# Project Management API

REST API for project and task management, built with NestJS, Prisma and PostgreSQL.

The application allows users to create projects, manage project members and create tasks with assigned users, including authentication and role-based authorization.

The application aims to be simple but with well-defined authorization rules.## Technologies

- Node.js
- TypeScript
- NestJS
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt
- class-validator

## Features

### Authentication
- User registration
- User login
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes

### Projects
- Create projects
- Update projects
- Delete projects
- Add and remove project members
- Project roles: OWNER, ADMIN and MEMBER
- Get user projects with filter (title,description,members)

### Tasks
- Create tasks
- Update tasks
- Delete tasks
- Filter tasks with filter (title,priority,status,dueData,members,projects)
- Assign and Unassign multiple users to tasks

### Authorization
- Role-based access control
- Project ownership validation
- Admin permissions
- Project membership validation

## SCHEMAS
```mermaid
    USER {
        id                Int             
        email             String          
        name              String          
        password          String          
        createdAt         DateTime        
        updatedAt         DateTime        
    }
            
    model ProjectMembers {
        userId    Int
        projectId Int
        role      ProjectRole
    }

    PROJECT {
        id          Int             
        title       String          
        description String          
        createdAt   DateTime
        updatedAt   DateTime
    }

    model TaskMembers {
        userId Int
        taskId Int
    }

    TASK {
        id          Int          
        title       String       
        description String       
        status      TaskStatus   
        priority    TaskPriority 
        dueDate     DateTime     
        projectId   Int          
        project     Project      
        createdAt   DateTime     
        updatedAt   DateTime     
    }
```

## Getting Started

### Pre-requisites

- Node.js
- PostgreSQL
- npm

git clone https://github.com/gabrielbarros23/Project-Manager.git

npm install

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/dbname?schema=public"
JWT_SECRET="your-secret"
```

### Database setup

Run the Prisma migrations:

```bash
npx prisma generate
```

### Start the application:
```start
npm run start:dev
```

### insomnia setup
Import the Insomnia file here. 
[![Run in Insomnia](https://github.com/user-attachments/assets/56736d74-ca2b-460c-b08e-091d0e9bf159)](https://github.com/gabrielbarros23/Project-Manager/blob/main/insomnia/ProjectManager)
