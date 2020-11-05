FROM nginx:stable

LABEL maintainer="akihiro-kiuchi"

USER root

WORKDIR /app/

ENV NODE_ENV=development

RUN apt-get update
RUN apt-get install -my wget gnupg
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get install nodejs -y
RUN apt-get install yarn -y
RUN yarn global add pm2

ADD package.json .
ADD yarn.lock .
RUN yarn install

COPY . .

RUN yarn build

ADD nginx/default.conf /etc/nginx/conf.d

ENTRYPOINT [ "/app/docker-entrypoint.sh" ]
