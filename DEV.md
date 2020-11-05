## Setup

#### Requirement

- Node.js ( My version: v13.14.0 )
- yarn (My version: v1.22.4)
- mysql (for local development)

#### .env

```sh
cp .env.sample .env
vim .env
```

- `DB_PASS` 自分のローカルの mysql のパスワード いらなかったら消してちょうだい
- `DB_USER` ユーザ名も指定可能(default: root)
- `DB_NAME`, `DB_TEST_NAME` そのままでいいと思う
- `STRIPE_API_KEY` Stripe に登録して自分の test api key (secret) を登録してください.
- `STRIPE_PUB_KEY` Stripe に登録して自分の test api key (public) を登録してください.
- `SECRET` そのままでいいと思う

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

## Test

#### Install Stripe Mock

Read [this](https://github.com/stripe/stripe-mock).

#### Create database

```sh
mysql -u <username>
> create database bokin_test_db;
```

#### Run

##### Start stripe mock

```sh
stripe-mock
```

No migration command needed (automatically synchronized).

```sh
# In another shell
yarn test
```

#### Deploy

1. https://github.com/settings/tokens ← ここにアクセスして、自分のパーソナル token を取得する

scope は repo(全て) と workflow に check を入れる.

2. 取得した token を`.env`の GITHUB_MY_TOKEN に設定する

3. デプロイ

```sh
node deploy.js # github の deploy をトリガーする
node deploy.js some/branch # branchの指定も可能
```

4. ステータスの確認はここから

https://github.com/jphacks/B_2010/actions

## Prefix Commit Message

|                  Content                   |        prefix         |          code           |
| :----------------------------------------: | :-------------------: | :---------------------: |
|                First commit                |        :tada:         |        `:tada:`         |
|          Introducing new features          |      :sparkles:       |      `:sparkles:`       |
|                Fixing a bug                |         :bug:         |         `:bug:`         |
|              Refactoring code              |       :recycle:       |       `:recycle:`       |
| Adding or updating the UI and style files  |         :art:         |         `:art:`         |
|      Improve development environment       |     :sunglasses:      |     `:sunglasses:`      |
|                Writing docs                |       :pencil:        |       `:pencil:`        |
|           Improving performance            |         :zap:         |         `:zap:`         |
|      Work for production environment       |       :running:       |       `:running:`       |
|        Changing configuration files        |       :wrench:        |       `:wrench:`        |
| Updating code due to code review changes.  |       :ok_hand:       |       `:ok_hand:`       |
|          Adding or updating tests          |  :white_check_mark:   |  `:white_check_mark:`   |
|           Fixing security issue            |        :lock:         |        `:lock:`         |
|     Adding or updating CI build system     | :construction_worker: | `:construction_worker:` |
| Writing bad code that needs to be improved |       :hankey:        |       `:hankey:`        |
|               Improving SEO                |         :mag:         |         `:mag:`         |
|          Experimenting new things          |       :alembic:       |       `:alembic:`       |
|              Critical hotfix               |      :ambulance:      |      `:ambulance:`      |
|           Removing code or files           |        :fire:         |        `:fire:`         |
|                 Save money                 |        :bank:         |        `:bank:`         |
|              Work In Progress              |    :construction:     |    `:construction:`     |
