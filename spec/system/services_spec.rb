require 'rails_helper'

describe 'サブスクリプション管理機能', type: :system do
  describe '一覧表示機能' do
    before do
      # 管理者ユーザーの作成
      admin = FactoryBot.create(:admin_user)
      # 一般ユーザー1の作成
      user1 = FactoryBot.create(:user1)
      # 一般ユーザー2の作成
      user2 = FactoryBot.create(:user2)
      # 管理者がサブスクリプションを作成
      FactoryBot.create(:service1)
      # 一般ユーザー1がサブスクリプションを作成
      FactoryBot.create(:service2, status: 'secret')
    end

    context 'ユーザー１がログインしている時' do
      before do
        # ユーザー１でログインする
        visit new_user_session_path
        fill_in 'メールアドレス', with: 'user1@example.com'
        fill_in 'パスワード', with: '000000'
        click_button 'ログイン'
      end

      it '管理者が作成したサブスクリプションが表示される' do
        # save_and_open_page
        # 作成済みのサブスクリプションの名称が画面上に表示されていることを確認
        expect(page).to have_content 'test_name1'
      end
    end
    context 'ユーザー２がログインしている時' do
      before do
        # ユーザー２でログインする
        visit new_user_session_path
        fill_in 'メールアドレス', with: 'user2@example.com'
        fill_in 'パスワード', with: '000000'
        click_button 'ログイン'
      end

      it 'ユーザー１が作成したサブスクリプションが表示されない' do
        # 作成済みのサブスクリプションの名称が画面上に表示されていないことを確認
        save_and_open_page
        expect(page).not_to have_content 'test_name2'
      end
    end
  end
end
