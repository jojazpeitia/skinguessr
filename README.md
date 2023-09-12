# <img src="https://cdn.discordapp.com/attachments/284025935521644544/1151235226320773140/skinguessrlogo.png" width="250" alt="SkinGuessr Logo"/> 

SkinGuessr is a fun and engaging web application designed for the Counter-Strike (CS) community of skin enthusiasts.

### URL
https://www.skinguessr.net/

### Roadmap
- Score System

- Increasing the pool of available skins

- Global Leaderboard

### Tech Stack
**Client:** Next.js, React, TailwindCSS, Typescript

**Server:**  AWS S3, AWS CloudFront,  PlanetScale, Prisma

### Environment Variables + Database stuff

To run this project, you will need to add the following environment variables to your .env file.
`DATABASE_URL`

Due to data protection concerns, I won't be able to provide direct access to the database.

You have the flexibility to either use a serverless database of your choice or create mock data for testing purposes.

*Side note: You might need to update the schema.prisma file depending on the serverless database provider.*

As for right now the data is being modeled as follows:
![Alt text](https://cdn.discordapp.com/attachments/1133991014042968084/1151243416227819600/image.png)

### Run Locally

Clone the project

```bash
  git clone https://github.com/jojazpeitia/skinguessr.git
```

Go to the project directory

```bash
  cd skinguessr
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
### Running Tests

To run tests, run the following command

```bash
  npx cypress open
```
