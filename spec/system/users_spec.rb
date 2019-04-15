require 'rails_helper'

describe 'ユーザー管理機能', type: :system do
  describe '新規登録機能' do
    context '新しいユーザーを登録する' do
      it 'ユーザー登録に成功するとマイページに画面遷移する' do
      end
      it 'ユーザー登録に失敗すると登録画面に戻る' do
      end
    end
  end
  describe 'ログイン機能' do
    context 'ログインする' do
      it 'ログインに成功するとマイページに画面遷移する' do
      end
      it 'ログインに失敗するとログイン画面に戻る' do
      end
    end
    context 'ログアウトする' do
      it 'ログアウトするとトップページに画面遷移する' do
      end
    end
    context 'Googleログインする' do
      it 'ログインに成功するとマイページに画面遷移する' do
      end
      it 'ログインに失敗するとログイン画面に戻る' do
      end
    end
  end
  describe '詳細機能' do
    context 'ユーザーがログインしている時' do
      it 'ユーザーの詳細情報が表示されている' do
      end
    end
  end
  describe '編集機能' do
    context '編集画面で名前を変更した時' do
      it '編集に成功した時、マイページの表示が変更される' do
      end
      it '編集に失敗した時、編集画面にリダイレクトされる' do
      end
    end
    context '編集画面でパスワードを変更した時' do
      it '再度ログインをした時、成功する' do
      end
      it '変更に失敗した時、編集画面にリダイレクトされる' do
      end
    end
  end
  describe '削除機能' do
    context '編集画面へ' do
      it '削除した時' do
      end
    end
  end
end
