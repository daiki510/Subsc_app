require 'rails_helper'

describe 'サブスクリプション管理機能', type: :system do
  describe '新規登録機能' do
    context '追加ボタンを押して登録' do
      it '登録に成功した時、マイページに表示される' do
      end
      it '登録に失敗した時、登録画面にリダイレクトされる' do
      end
    end
  end
  describe '一覧表示機能' do
    context 'サービスを追加している場合' do
      it '利用料金が表示されている' do
      end
      it '支払日が表示されている' do
      end
    end
  end
  describe '詳細機能' do
    context 'サービスを追加している場合' do
      it '利用料金が表示されている' do
      end
      it '支払日が表示されている' do
      end
    end
  end
  describe '編集機能' do
    context '金額を変更する' do
      it '編集に成功した時、金額の表示が変更される' do
      end
      it '編集に失敗した時、編集画面にリダイレクトされる' do
      end
    end
  end
  describe '削除機能' do
    context '削除ボタンを押す' do
      it 'マイページのサブスクリプション一覧から表示されなくなる' do
      end
    end
  end
end
