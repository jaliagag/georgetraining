# Docker section

Correr jenkings con puerto 8080 y volumen en /var/jenkins_home:

`docker run -p 80:8080/tcp jenkins/jenkins:latest -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts-jdk11`



