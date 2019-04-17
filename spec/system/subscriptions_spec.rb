require 'rails_helper'

describe 'サブスクリプション管理機能', type: :system do
  let(:user) { FactoryBot.create(:user) }
  let(:admin_user) { FactoryBot.create(:admin_user) }
  let!(:service_01) { FactoryBot.create(:service, user: admin_user, name: 'testname_01') }
  let!(:service_02) { FactoryBot.create(:service, user: admin_user, name: 'testname_02') }
  let!(:subscription_02) { FactoryBot.create(:subscription, user: user, service: service_02, charge: 2000, due_date: 20) }
  before do
    visit new_user_session_path
    fill_in 'メールアドレス', with: login_user.email
    fill_in 'パスワード',	with: login_user.password
    click_button 'Sign in'
    visit services_path
  end

  describe '新規登録機能' do
    context '追加ボタンを押して登録' do
      let(:login_user) { user }
      before do
        visit services_path
        find('.add-btn-1').click
      end
      it '追加ボタンを押すと、登録画面へ遷移する' do
        expect(current_path).to eq new_subscription_path
        expect(page).to have_selector '.service-title', text: 'testname_01'
      end
      it '登録に成功した時、マイページに表示される' do
        fill_in '利用料金',	with: 1000
        select 10, from: 'subscription[due_date]'
        click_button '登録する'
        visit user_path(user.id)
        expect(page).to have_selector 'h5.service-title', text: 'testname_01'
      end
      it '登録に失敗した時、登録画面にリダイレクトされる' do
        fill_in '利用料金',	with: ''
        click_button '登録する'
        expect(current_path).to eq new_subscription_path
      end
    end
  end
  describe 'マイページのテスト' do
    let(:login_user) { user }
    before do
      visit user_path(user.id)
    end
    describe '一覧表示機能' do
      it '利用料金が表示されている' do
        expect(page).to have_selector 'span.charge-item', text: '2000円'
      end
      it '支払日が表示されている' do
        expect(page).to have_selector 'span.due-date-item', text: '20日'
      end
    end
    describe '詳細機能' do
      before do
        find('.subsc-info-1').click
      end
      it '利用料金が表示されている' do
        expect(page).to have_selector 'h5.charge-text', text: '2000円'
      end
      it '支払日が表示されている' do
        expect(page).to have_selector 'h5.due-date-text', text: '毎月 20日'
      end
    end
    describe '編集機能' do
      before do
        find('.subsc-edit-1').click
      end
      context '金額を変更する' do
        it '編集に成功した時、金額の表示が変更される' do
          fill_in '利用料金',	with: 3000
          click_button '更新する'
          expect(page).to have_selector 'span.charge-item', text: '3000円'
        end
        it '編集に失敗した時、編集画面にリダイレクトされる' do
          fill_in '利用料金',	with: ''
          click_button '更新する'
          # byebug
          expect(current_path).to eq edit_subscription_path(subscription_02.id)
        end
      end
      context '支払日を変更する' do
        it '編集に成功した時、支払日の表示が変更される' do
          select 30, from: 'subscription[due_date]'
          click_button '更新する'
          expect(page).to have_selector 'span.due-date-item', text: '30日'
        end
      end
    end
    describe '削除機能' do
      before do
        find('.subsc-delete-1').click
      end
      context '削除ボタンを押す' do
        it 'マイページに削除メッセージが表示される' do
          page.accept_confirm '本当に解除してもいいですか?'
          expect(page).to have_selector '.alert', text: '「testname_02」を利用一覧から外しました'
        end
      end
    end
  end
end
