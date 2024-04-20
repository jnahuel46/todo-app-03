# Development
Steps to rise up the application in development

1. * Run database 
```
docker compose up -d
```

2. * Prisma Commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate //generate prisma client
```

3. * Rename the .env.template file to an .env file and update with your credentials
4. * Run ```npm install```
5. * Run ```npm run dev```
6. * Run ```npx prisma migrate dev```
7. * Run ```npx prisma generate```
8. * Run Seeds ```http://localhost:3000/api/seed```# todo-app-03
