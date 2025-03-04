# This python version does not have issues with sqlacodegen dependency which is use to reverse engineer SQL Alchemy models
FROM python:3.10 as base

WORKDIR /models

COPY ./requirements.txt .

RUN pip install -r ./requirements.txt
RUN mkdir /generated
