FROM ubuntu:latest
LABEL authors="Sulaiman.Olayinka"

# docker file goes here

ENTRYPOINT ["top", "-b"]