# Maclay Rush

<img width="1792" alt="スクリーンショット 2024-10-27 12 03 16" src="https://github.com/user-attachments/assets/2442dc92-3585-40f8-9d17-31f0aa44a80c">

## 製品概要
### 背景(製品開発のきっかけ、課題等）
- テーマ：まだ知らない本をゲームを通して楽しみながら探せるSNSを作りたい！
- 現在の課題: 現代人の読書離れ、無作為に本を探すには図書館・書店に行く必要性
- 世間が求めているもの: スキマ時間を活用しながらのより良い読書体験との出会い
### 製品説明（具体的な製品の説明）
⚠️ この製品は以前からの継続開発であり今回開発した機能は「プレビュー機能」と「レビュー機能」です。
- ログイン機能: Auth.jsのGoogleログイン機能
- 司書体験ゲーム: 入力したトピックに合わせて実際に存在する本の貸し出し業務を行うゲーム
- リザルト画面: ゲーム内で登場した本の情報を見ることができ、My本棚に追加
- My本棚: 追加した本の管理、レビューの閲覧、試し読み
- 本棚ギャラリー: 他ユーザーの本棚の閲覧
- プレビュー機能: 本棚に入れた本の試し読み
- レビュー機能: 実際に読んだ本でレビューを書く、他ユーザーのレビューの閲覧

### 特長

#### 1. 新しいジャンルの本を読むきっかけになる
#### 2. 同じ本を読んだユーザとのつながりを感じられる
#### 3. 本の詳細を手軽に知ることができる

### 解決出来ること
若者をターゲットとした手軽なSNSのフォーマットを踏襲しつつ、書籍情報提供アプリとしての機能を強化することで、若者を読書離れから惹きつける契機となる。

### 今後の展望
- 他ユーザのフォロー機能
- 他ユーザとの読書競争要素

### 注力したこと（こだわり等）
* Next.jsのServer Actionsを使い、迅速なレスポンスをサポート
* 視認性、操作性の高さと世界観に剃ったUIデザインの考案

## 開発技術
### 活用した技術
#### API・データ
* Google Books APIs
* PostgreSQL
* さくらのVPNを活用したサーバの構築

#### フレームワーク・ライブラリ・モジュール
* Next.js
* Auth.js

#### デバイス
* Web(デスクトップ)

### 独自技術
オンプレミスサーバーの構築
現実世界と融合させた新感覚のゲーム

#### ハッカソンで開発した独自機能・技術
* レビュー機能の開発
* 特に力を入れた部分をファイルリンク、またはcommit_idを記載してください。
feat:create-review #2
