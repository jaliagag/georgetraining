# Docker section

## Running this scenario

### Requirements

- Docker installed
- Git installed

### Steps

1. Clone this repository
2. cd into Docker/app directory
3. Run `docker build -t myapp:1 .`. This command builds a _new_ image called myapp, version 1 and for that uses the information on the **Dockerfil** file

```console
FROM node:17-alpine3.14
WORKDIR /app
COPY . .
CMD ["node", "index.js"]
EXPOSE 3000
```

- FROM: Tells docker _which_ image will be used as base
- WORKDIR: The WORKDIR instruction sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile. If the WORKDIR doesn’t exist, it will be created even if it’s not used in any subsequent Dockerfile instruction.
- COPY: Copies from source (first dot, this case, all on this directory) to the destination (second dot, the WORKDIR)
- CMD: The command that will be executed 
- EXPOSE: The port that will be exposed

4. Run `docker run -dp 3000:3000 myapp:1`
5. Done! test with `curl localhost:3000`

## other

Correr jenkings con puerto 8080 y volumen en /var/jenkins_home:

`docker run -p 80:8080/tcp jenkins/jenkins:latest -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts-jdk11`

- [Docker test app](https://docs.docker.com/get-started/02_our_app/)


