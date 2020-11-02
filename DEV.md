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

#### Start

```sh
yarn start
```

Access to localhost:3000
