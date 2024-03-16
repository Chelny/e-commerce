# E-commerce <a name="readme-top"></a>

E-commerce website made with <a href="https://nextjs.org/" target="_blank">Next.js</a>, <a href="https://tailwindcss.com/" target="_blank">TailwindCSS</a>, <a href="https://www.prisma.io/" target="_blank">Prisma</a> and <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a>.

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Visual Studio](https://img.shields.io/badge/Visual%20Studio-5C2D91.svg?style=for-the-badge&logo=visual-studio&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

| Home Page                                                     | Login Page                                                     |
| ------------------------------------------------------------- | -------------------------------------------------------------- |
| <img src="public/assets/images/github/home-page-desktop.png"> | <img src="public/assets/images/github/login-page-desktop.png"> |

## Installation

**Clone project**

```
git clone git@github.com:Chelny/e-commerce.git
```

Navigate to the root directory of the project. Create a new file named `.env` and fill it with the required environment variables based on the provided `.env.example` file.

**Install dependencies**

```
pnpm i
```

**Serve the Client**

```
pnpm run dev
```

This command starts the development server, allowing you to access your application locally.

Then, on another terminal...

**Generate Prisma Artifacts**

```
pnpm dlx prisma generate
```

This command generates TypeScript types for your Prisma schema, which allows for type-safe database interactions in your code.

**Push Prisma Schema State to the Database**

```
pnpm dlx prisma db push
```

This command applies the changes in your Prisma schema to the connected database. Ensure your database connection details are correctly configured in your .env file.

**Run SQL Queries**

Navigate to the root directory, where you'll find a folder named `sql/`. Inside this folder, you'll find .sql files designed to be executed in your preferred database GUI tool.

**Browse Your Data**

```
prisma studio
```

This command opens Prisma Studio, a visual interface for exploring and managing your data. Use it to inspect the data in your database.

<p align="end">(<a href="#readme-top">back to top</a>)</p>
