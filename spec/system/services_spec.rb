require 'rails_helper'

describe 'サービス管理機能', type: :system do
  # before do
  #   admin = FactoryBot.create(:admin_user)
  #   user1 = FactoryBot.create(:user1)
  #   user2 = FactoryBot.create(:user2)
  #   FactoryBot.create(:service1, user: admin)
  #   FactoryBot.create(:service2, status: 'secret', user: user1)
  # end
  describe '一覧表示機能' do
    describe '管理ユーザーがサービスを登録している時' do
      context '管理ユーザーがログインしている時' do
        it '管理者が作成したサブスクリプションが表示される' do
        end
      end
      context '一般ユーザーがログインしている時' do
        it '管理者が作成したサブスクリプションが表示される' do
        end
      end
      context 'ゲストユーザーが一覧画面にいる時' do
        it '管理者が作成したサブスクリプションが表示される' do
        end
        it '追加ボタンが表示されない' do
        end
        it '関連リンクボタンが表示されない' do
        end
      end
    end
    describe '一般ユーザーがサービスを登録している時' do
      context '管理ユーザーがログインしている時' do
        it '一般ユーザーが作成したサブスクリプションが表示されない' do
        end
      end
      context '一般ユーザーがログインしている時' do
        it '一般ユーザーが作成したサブスクリプションが表示される' do
        end
      end
    end
  end

  describe '新規登録機能' do
    context 'ユーザーがログインしている時' do
      it '登録に成功した時、一覧画面に表示される' do
      end
      it '登録に失敗した時、登録画面にリダイレクトされる' do
      end
    end
  end
  describe '詳細機能' do
    context '管理者がログインしている時' do
      it '管理者が作成したサブスクリプションが表示される' do
      end
    end
    context '一般ユーザーがログインしている時' do
      it '編集ボタンが表示されない' do
      end
    end
  end
  describe '編集機能' do
    describe '管理者がログインしている時' do
      context '名前を変更した時' do
        it '編集に成功した時、一覧画面で表示が変更されている' do
        end
        it '編集に失敗した時、編集画面にリダイレクトされる' do
        end
      end
    end
  end
  describe '削除機能' do
    context '管理者がログインしている時' do
      it '一覧画面から表示されなくなる' do
      end
    end
  end

  describe 'カテゴリー検索' do
    context '任意のカテゴリーをクリックする' do
      it 'クリックしたカテゴリーを持つサービスのみ表示される' do
      end
    end
  end
  describe '検索機能' do
    context '任意のサービス名を検索' do
      it '検索にヒットすると、一覧画面に表示される' do
      end
      it '検索結果がない場合は、ないことを示す文章が表示される' do
      end
    end
  end
  describe 'ソート機能' do
    context '名前順にソート' do
      it 'ABC順にソートされる' do
      end
    end
    context '人気順にソート' do
      it '利用者数の多い順にソートされる' do
      end
    end
    context '新着順にソート' do
      it '作成日が新しい順にソートされる' do
      end
    end
    context '更新順にソート' do
      it '更新日が新しい順にソートされる' do
      end
    end
  end
end
