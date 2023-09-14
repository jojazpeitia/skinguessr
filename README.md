## <p align="center"> <img src="https://cdn.discordapp.com/attachments/284025935521644544/1151235226320773140/skinguessrlogo.png" width="250" alt="SkinGuessr Logo"/> </p>

This GitHub repository hosts the SkinGuesser web application, a fun and interactive platform designed exclusively for the Counter-Strike community of skin enthusiasts. With this app, users are presented with random skin images and have up to three attempts to guess their names correctly. The game is centered around a point-based system that rewards players for consecutive correct guesses. Immerse yourself in the world of Counter-Strike, test your knowledge, and enjoy the thrill of the SkinGuesser challenge.

## URL
https://www.skinguessr.net/

## Features
- Autofill Search Suggestions
- Guessing Mechanism
- Image Zoom Out
## Roadmap
- [ ] Increasing the pool of available skins
- [ ] Score System
- [ ] Global Leaderboard

## Tech Stack
**Client:** Next.js, React, TailwindCSS, Typescript

**Server:**  AWS S3, AWS CloudFront,  PlanetScale, Prisma

## Environment Variables + Database stuff

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

The environment variable is not provided due to data protection concerns.

You have the flexibility to either use a serverless database of your choice or create mock data for testing purposes.

*Note: You might need to update the schema.prisma file depending on the serverless database provider.*

As for right now the data is being modeled as follows:
![Alt text](https://cdn.discordapp.com/attachments/1133991014042968084/1151243416227819600/image.png)

## Run Locally

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
## Running Tests

To run tests, run the following command

```bash
  npx cypress open
```
