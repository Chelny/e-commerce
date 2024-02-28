# E-commerce <a name="readme-top"></a>

E-commerce website made with <a href="https://nextjs.org/" target="_blank">Next.js</a>, <a href="https://tailwindcss.com/" target="_blank">TailwindCSS</a>, <a href="https://www.python.org/" target="_blank">Python</a> (<a href="https://www.djangoproject.com/" target="_blank">Django</a> and <a href="https://www.django-rest-framework.org/" target="_blank">Django REST</a>) and <a href="https://www.sqlite.org/" target="_blank">SQLite</a>.

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Visual Studio](https://img.shields.io/badge/Visual%20Studio-5C2D91.svg?style=for-the-badge&logo=visual-studio&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

| Home Page                                                            | Login Page                                                            |
| -------------------------------------------------------------------- | --------------------------------------------------------------------- |
| <img src="client/public/assets/images/github/home-page-desktop.png"> | <img src="client/public/assets/images/github/login-page-desktop.png"> |

## Installation

Clone project

```
git clone git@github.com:Chelny/e-commerce.git
```

### Server

On the `server/` directory, set `.env` file from the provided `.env.example` file.

Open a terminal and go to the `server/` directory:

```
cd server
```

Create and activate virtual environment with:

```
python<version> -m venv <virtual-environment-name>
source <virtual-environment-name>/bin/activate
```

Install dependencies:

```
pip install -r requirements.txt
```

Apply migration (the project uses a database):

```
python manage.py makemigrations
python manage.py migrate
```

Run server:

```
python manage.py runserver
```

### Client

On the `client/` directory, set `.env` file from the provided `.env.example` file.

Open a new terminal and go to the `client/` directory:

```
cd client
```

Install dependencies:

```
pnpm i
```

Run server:

```
pnpm run dev
```

<p align="end">(<a href="#readme-top">back to top</a>)</p>

## Tests

### Server

```
python manage.py test # Run all tests
python manage.py test your_app_name # Run tests for a specific app or module
python manage.py test your_app_name.tests.test_module # Run tests for a specific test file or for a specific test class or method
```

<p align="end">(<a href="#readme-top">back to top</a>)</p>
