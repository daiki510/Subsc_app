# README

# Subsc

## 概要
利用しているサブスクリプション（定額制のサービス）を見える化します。
毎月の合計利用金額や支払日などの基本情報を管理し、それらををメールやLINEbotを利用して通知してくれるサービスです。
このアプリによって、無駄な消費も減り、使うべきサービスに投資ができます。

## コンセプト
利用しているサブスクリプションの見える化

## バージョン
Ruby 2.5.3 Rails 5.2.2

## 機能一覧
### ユーザー管理機能
- ログイン機能
- SNSログイン機能
  - Twitter,Google,Facebookでのログイン可能
- ユーザー登録機能
  - 名前、メールアドレス、パスワード
  - 削除は不可、退会手続き必要
- パスワード再設定機能
  - パスワード再設定メール自動送信機能

### サブスク管理機能
- サブスクリプション一覧表示機能
  - 一覧表示から利用中のサービスを追加可能
- サブスクリプション登録機能(一覧表示にない場合)
  - サービス名、料金、支払日、カテゴリー、アイコン(トリミング可)
- サブスクリプション詳細表示機能
  - 編集 (追加: 支払方法、備考欄)、削除可能
- 検索機能
- ソート機能
- ページネーション機能

### 管理者機能(権限者のみ)
- ユーザー一覧表示機能
- ユーザー管理機能
  - ユーザーの登録・編集・削除機能
  - 一般ユーザーへの権限付与機能
- アクセス権限機能
  - 管理者ユーザーと一般ユーザーでの利用範囲設定
  - ログインユーザーと非ログインユーザーでの利用範囲設定 
- サブスクリプション一覧表示機能
- サブスクリプション管理機能
  - サブスクリプションの追加・編集・削除機能

## カタログ設計
https://docs.google.com/spreadsheets/d/1hPqpIB2Ms8fzKr9zm89k4ASGjcrKa0S7N4r2jgp4o6k/edit#gid=1946627660

## テーブル定義
https://docs.google.com/spreadsheets/d/1o8ACI7H_Ut6xjQQV_lHISc-vdTYbjl_mUdN6vjlTunU/edit#gid=851735436

## 画面遷移図
https://docs.google.com/spreadsheets/d/18RVg06Y_ombAyhJGxcHJfMpSvAPEs7WTvHnawqcoWbI/edit#gid=0

## 画面ワイヤーフレーム
https://docs.google.com/spreadsheets/d/1kWLZ5_rrjU3MG7BgFCa_ZDRlWnGTrGcJVC5ldbRVt-M/edit#gid=233292008

## 使用予定Gem
- devise
- omniauth
- line_bot_app
- activerecord-import
- order_as_specified
- will_paginate
- carrierwave
- mini_magick