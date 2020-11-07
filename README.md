# BOKIN

[![IMAGE ALT TEXT HERE](./doc/Bokin.png)](https://google.com)

![Build image and Deploy to ECS](https://github.com/jphacks/B_2010/workflows/Build%20image%20and%20Deploy%20to%20ECS/badge.svg)
![Run Unit Tests](https://github.com/jphacks/B_2010/workflows/Run%20Unit%20Tests/badge.svg)

## 製品概要

### 背景(製品開発のきっかけ、課題等）

コロナで家にいることが多くなった。
ついつい遅くまで寝てしまうが、早く起きて 1 日の生産性を上げたい

### 製品説明（具体的な製品の説明）

早起きを三つの観点からサポート

### 特長

####1. 起きれなかったら募金

ユーザが設定した時刻までに起きれなかったらユーザのクレジットカードから募金されます.

出費を抑えるために、早起きしようという気になります.

####2. 起きれたかどうか Twitter で世界に発信

その日起きれたかどうか、ユーザー自身の SNS アカウントで世界に発信されます.

朝も起きれない人間だと思われないように、早起きすることになるでしょう.

####3. 朝の覚醒をサポート

TODO

### 解決出来ること

早起きしたいけど、ついつい寝てしまう人の課題解決と、世界への福祉貢献

### 今後の展望

IOS 化、アラーム機能を取り入れる
TODO

### 注力したこと（こだわり等）

- **ちゃんと**作った

## 開発技術

### 活用した技術

#### フレームワーク・ライブラリ・モジュール

- インフラ
  - AWS ECS (アプリケーション)
  - Aurora (DB)
  - System Manager/Parameter Store (秘匿値管理)
- フレームワーク, 言語
  - typescript
  - express.js
  - passport.js
  - typeorm
  - twitter API
  - Stripe (決済)
- CI/CD
  - Github Action
    - test
    - lint check
    - deploy

### 独自技術

#### ハッカソンで開発した独自機能・技術

- 独自で開発したものの内容をこちらに記載してください
- 特に力を入れた部分をファイルリンク、または commit_id を記載してください。
