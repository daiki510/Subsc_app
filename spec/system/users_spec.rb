require 'rails_helper'

describe 'ユーザー管理機能', type: :system do
  describe 'ログイン前のテスト' do
    let!(:user) { FactoryBot.create(:user) }
    describe '新規登録機能' do
      before do
        visit new_user_registration_path
        fill_in 'メールアドレス', with: 'testuser_01@example.com'
        fill_in 'パスワード', with: '000000'
        fill_in '確認用パスワード', with: '000000'
      end
      it '新規登録画面で名前を入力した時、正常に登録される' do
        fill_in '名前', with: 'testuser_01'
        click_button 'Sign up'
        expect(page).to have_selector '.alert', text: 'アカウント登録が完了しました'
      end
      it '新規作成画面で名称を入力しなかった時、エラーとなる' do
        fill_in '名前', with: ''
        click_button 'Sign up'
        within '#error_explanation' do
          expect(page).to have_content '名前を入力してください'
        end
      end
    end
    describe 'ログイン機能' do
      before do
        visit new_user_session_path
      end
      context 'ログインに成功した時' do
        it 'ログイン後のメッセージが表示される' do
          fill_in 'メールアドレス', with: 'testuser@example.com'
          fill_in 'パスワード', with: '000000'
          click_button 'Sign in'
          expect(page).to have_selector '.alert', text: 'ログインしました'
        end
      end
      context 'ログインに失敗した時' do
        it '失敗した時のメッセージが表示される' do
          fill_in 'メールアドレス', with: 'test@example.com'
          fill_in 'パスワード', with: '000000'
          click_button 'Sign in'
          expect(page).to have_selector '.alert', text: 'メールアドレス もしくはパスワードが不正です'
        end
      end
    end
  end

  describe 'ログイン後のテスト' do
    let(:user) { FactoryBot.create(:user, email: 'testuser_02@example.com') }
    before do
      visit new_user_session_path
      fill_in 'メールアドレス', with: login_user.email
      fill_in 'パスワード',	with: login_user.password
      click_button 'Sign in'
    end
    context '詳細機能' do
      context 'ユーザーがログインしている時' do
        let(:login_user) { user }
        it 'ユーザーの詳細情報が表示されている' do
          expect(page).to have_content 'testuser_02@example.com'
        end
      end
    end
    context '編集機能' do
      let(:login_user) { user }
      before do
        visit edit_user_registration_path
      end
      context '編集画面で名前を変更した時' do
        it '編集に成功した時、名前の表示が変更される' do
          fill_in '名前', with: 'change-user-name'
          fill_in '現在のパスワード', with: login_user.password
          click_button 'Update'
          expect(page).to have_content 'change-user-name'
        end
        it '編集に失敗した時、編集画面にリダイレクトされる' do
          fill_in '名前', with: ''
          fill_in '現在のパスワード', with: login_user.password
          click_button 'Update'
          expect(page).to have_content '名前を入力してください'
        end
      end
      context '編集画面で通知頻度を変更した時' do
        it '編集に成功した時、通知頻度の表示が変更される' do
          select 'オフ', from: 'user[notification_status]'
          fill_in '現在のパスワード', with: login_user.password
          click_button 'Update'
          expect(page).to have_content 'オフ'
        end
      end
    end
    context '削除機能' do
      let(:login_user) { user }
      before do
        visit edit_user_registration_path
        find('#delete-user').click
        page.accept_confirm '本当に削除してよろしいですか？ 全てのデータが削除されます'
      end
      context 'ユーザーを削除した場合' do
        it 'トップページに画面遷移する', js: true do
          expect(current_path).to eq root_path
        end
        it 'ログインができずエラーメッセージが表示される', js: true do
          visit new_user_session_path
          fill_in 'メールアドレス', with: login_user.email
          fill_in 'パスワード', with: login_user.password
          click_button 'Sign in'
          expect(page).to have_selector '.alert', text: 'メールアドレス もしくはパスワードが不正です'
        end
      end
    end
  end
end
