<h1>DOW</h1>

🔗 [Donate Or Wake up](http://dow.teguchi.jp)

[![IMAGE ALT TEXT HERE](./doc/DOW.png)](https://dow.teguchi.jp)

![](doc/title.png)

<!-- <p>人類共通の悩み、それは、、、</p>

<p style="color: darkblue; text-align: center; font-size: 30px; font-weight: bold"> 朝、起きられない。</p>

<p style="float: right;">そう、誰もが持ったことのあるはずの悩み。</p>

<br>
<br>
<br>

<hr style="background-color: black; height: 1px; display: inline-block; width: 100px; transform: translateY(17px);">
<p style="font-size: 20px; display: inline; margin: 0 10px 0 10px;"><i>DOW の解決策</i></p>
<hr style="background-color: black; height: 1px; display: inline-block; width: 100px; transform: translateY(17px);">

<p style="text-align: center; font-size: 25px; font-weight: bold; letter-spacing: 2px; margin-top: 30px">
  起きられなければ<span style="color: red; font-size: 50px; margin: 0 10px 0 10px;">募金</span>します!!!
</p> -->

## 製品概要

### 製品説明（具体的な製品の説明）

早起きを三つの観点からサポート

### 特長

#### 1. 起床認証

![](doc/feature1.png)

<!-- <div style="display: flex">
  <img src="./doc/Auth.jpg" style="width: 50%; max-width: 250px; margin: 0 16px; border: solid;">
  <div>
    <p>お題の画像を撮影できなければ, 起床したことになりません.</p>
    <p>ユーザは自身で設定した起床時刻より早く起床認証をパスする必要があります.</p>
    <p>例えば図の例では,リビングまで時計を撮影しなくてはいけないため二度寝を防止できます.</p>
    <p>お題の画像が撮影できたかについては, 画像認識の技術を用いて判定します.</p>
  </div>
</div> -->

#### 2. SNS 共有

![](doc/feature2.png)

<!-- <div style="display: flex">
  <img src="./doc/SNS.png" style="width: 50%; max-width: 250px; margin: 0 16px; border: solid;">
  <div>
    <p>起床時刻や寝坊, 募金したことが, ユーザのSNSアカウントで自動的に発信されます.</p>
    <p>他人からの目線が早起きをより促進させます.</p>
  </div>
</div> -->

#### 3. 自動募金

![](doc/feature3.png)

<!-- <div style="display: flex">
  <img src="./doc/Donation.jpeg" style="width: 50%; max-width: 250px; margin: 0 16px; border: solid;">
  <div>
    <p>事前のクレジットカード登録で有無を言わさず募金されます.</p>
    <p>クラウドファンディングや慈善団体など、募金先を選べます.</p>
    <p></p>
  </div>
</div> -->

### 今後の展望

- 起床や支払い金額に関する統計情報を出す.
- 入眠から起床まで全てを担当するアプリ(iOS)にする.
- ユーザが起きた情報をシェアできる SNS を増やす.(LINE グループで情報をシェアできるなど)
- 顔の表情から眠さを検知する機械学習を導入する.

### 注力したこと（こだわり等）

- **ちゃんと**作った
  - Stripe の導入
  - スケーラブルなインフラ
  - CI/CD

## 開発技術

![Build image and Deploy to ECS](https://github.com/jphacks/B_2010/workflows/Build%20image%20and%20Deploy%20to%20ECS/badge.svg)
![Run Unit Tests](https://github.com/jphacks/B_2010/workflows/Run%20Unit%20Tests/badge.svg)

### 活用した技術

#### API

- Google Cloud Vision

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
    - test & lint check
    - deploy

### 独自技術

#### ハッカソンで開発した独自機能・技術

- あえていうならば、システム全体
