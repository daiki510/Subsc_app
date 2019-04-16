require 'rails_helper'

describe 'サービス管理機能', type: :system do
  let(:user) { FactoryBot.create(:user) }
  let(:admin_user) { FactoryBot.create(:admin_user) }
  let!(:service_01) { FactoryBot.create(:service, user: admin_user, name: 'testname_01') }
  let!(:service_02) { FactoryBot.create(:service, user: user, name: 'testname_02', status: 'secret') }
  # let(:category) { FactoryBot.create(:category, name: 'test') }
  # let!(:service) { FactoryBot.create(:service, user: user, categories: [category]) }
  describe '一覧表示機能' do
    describe '登録ユーザー' do
      before do
        visit new_user_session_path
        fill_in 'メールアドレス', with: login_user.email
        fill_in 'パスワード',	with: login_user.password
        click_button 'Sign in'
        visit services_path
      end
      context '管理ユーザーがログインしている時' do
        let(:login_user) { admin_user }
        it '管理者が作成したサービスを閲覧できる' do
          expect(page).to have_content 'testname_01'
        end
        it '一般ユーザーが作成したサービスを閲覧できない' do
          expect(page).not_to have_content 'testname_02'
        end
      end
      context '一般ユーザーがログインしている時' do
        let(:login_user) { user }
        it '一般ユーザーがサービスを閲覧できる' do
          expect(page).to have_content 'testname_01'
        end
      end
    end
    describe 'ゲストユーザー' do
      before do
        visit services_path
      end
      context 'ゲストユーザーが一覧画面にいる時' do
        it '管理者が作成したサービスが表示される' do
          expect(page).to have_content 'testname_01'
        end
        it '追加ボタンが表示されない' do
          expect(page).not_to have_css '.add-btn'
        end
        it '関連リンクボタンが表示されない' do
          expect(page).not_to have_css '.btn-link'
        end
      end
    end
  end

  xdescribe '新規登録機能' do
    context 'ユーザーがログインしている時' do
      it '登録に成功した時、一覧画面に表示される' do
      end
      it '登録に失敗した時、登録画面にリダイレクトされる' do
      end
    end
  end
  xdescribe '詳細機能' do
    context '管理者がログインしている時' do
      it '管理者が作成したサブスクリプションが表示される' do
      end
    end
    context '一般ユーザーがログインしている時' do
      it '編集ボタンが表示されない' do
      end
    end
  end
  xdescribe '編集機能' do
    describe '管理者がログインしている時' do
      context '名前を変更した時' do
        it '編集に成功した時、一覧画面で表示が変更されている' do
        end
        it '編集に失敗した時、編集画面にリダイレクトされる' do
        end
      end
    end
  end
  xdescribe '削除機能' do
    context '管理者がログインしている時' do
      it '一覧画面から表示されなくなる' do
      end
    end
  end

  xdescribe 'カテゴリー検索' do
    context '任意のカテゴリーをクリックする' do
      it 'クリックしたカテゴリーを持つサービスのみ表示される' do
      end
    end
  end
  xdescribe '検索機能' do
    context '任意のサービス名を検索' do
      it '検索にヒットすると、一覧画面に表示される' do
      end
      it '検索結果がない場合は、ないことを示す文章が表示される' do
      end
    end
  end
  xdescribe 'ソート機能' do
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
