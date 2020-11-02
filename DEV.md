## Setup

#### Requirement

- Node.js ( My version: v13.14.0 )
- yarn (My version: v1.22.4)
- mysql (for local development)

#### Install this repository

```sh
git clone git@github.com:jphacks/B_2010.git
```

#### Install dependencies

```sh
yarn install
```

#### Transpile

```sh
yarn build
```

- `-w`: watch option is available

#### Create database

```sh
mysql -u <username> -p
...Enter Password
> create database bokin_db;
```

#### Synchronize DB schema

you need to [transpile](#build) first.

```sh
yarn schema:sync
```

開発期間は migration は行わず、schema:sync で DB 管理します.
(DB のスキーマを /dist/entity/\*.js の内容と同期する. 本番環境ではデータの散逸に繋がり危険だが、とりあえず開発段階は問題ないので、そうする)

#### Start

```sh
yarn start
```

Access to http://localhost:3000/login
