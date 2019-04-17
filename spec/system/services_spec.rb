require 'rails_helper'

describe 'サービス管理機能', type: :system do
  let(:user) { FactoryBot.create(:user) }
  let(:admin_user) { FactoryBot.create(:admin_user) }
  let!(:category) { FactoryBot.create(:category, name: 'category_test') }
  let!(:service_01) { FactoryBot.create(:service, user: admin_user, name: 'testname_01') }
  let!(:service_02) { FactoryBot.create(:service, user: user, name: 'testname_02', status: 'secret') }
  let!(:service_03) { FactoryBot.create(:service, user: admin_user, name: 'testname_05') }
  let!(:subscription) { FactoryBot.create(:subscription, user: user, service: service_03) }

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

  describe 'サービス基本機能' do
    before do
      visit new_user_session_path
      fill_in 'メールアドレス', with: login_user.email
      fill_in 'パスワード',	with: login_user.password
      click_button 'Sign in'
      visit services_path
    end
    describe '新規登録機能' do
      let(:login_user) { admin_user }
      context '登録に成功した時' do
        before do
          visit new_service_path
          fill_in 'サービス名', with: 'testname_03'
          fill_in 'service[summary]',	with: 'testsummary_03'
          click_button '登録する'
        end
        it 'フラッシュメッセージが表示される' do
          expect(page).to have_selector '.alert', text: '「testname_03」を登録しました'
        end
        it '一覧画面にリダイレクトされる' do
          expect(current_path).to eq services_path
        end
      end
      context '登録に失敗した時' do
        before do
          visit new_service_path
          fill_in 'サービス名', with: ''
          fill_in 'service[summary]',	with: 'testsummary_03'
          click_button '登録する'
        end
        it 'エラーメッセージが表示される' do
          expect(page).to have_content '名前を入力してください'
        end
      end
      context 'カテゴリーを追加して登録した時' do
        before do
          visit new_service_path
          fill_in 'サービス名', with: 'test_name_03'
          fill_in 'service[summary]',	with: 'testsummary_03'
          check 'category_test'
          click_button '登録する'
        end
        it '一覧画面にカテゴリー名が表示される' do
          expect(page).to have_selector 'a.badge', text: 'category_test'
        end
      end
    end
    describe '詳細機能' do
      context '管理者がログインしている時' do
        let(:login_user) { admin_user }
        it '管理者が作成したサブスクリプションが表示される' do
          find('.service-info-1').click
          expect(page).to have_content 'testname_01'
        end
      end
    end
    describe '編集機能' do
      context '管理者がログインしている時' do
        let(:login_user) { admin_user }
        before do
          find('.service-info-1').click
          find('.service-edit').click
        end
        context '名前を変更した時' do
          it '編集に成功した時、一覧画面でメッセージが表示される' do
            fill_in 'サービス名',	with: 'change_service_name'
            click_button '更新する'
            expect(page).to have_selector '.alert', text: '「change_service_name」を更新しました'
          end
          it '編集に失敗した時、編集画面にリダイレクトされる' do
            fill_in 'サービス名',	with: ''
            click_button '更新する'
            within '#error_explanation' do
              expect(page).to have_content '名前を入力してください'
            end
          end
        end
      end
      context '一般ユーザーがログインしている時' do
        let(:login_user) { user }
        it '編集ボタンが表示されない' do
          find('.service-info-1').click
          expect(page).not_to have_css '.service-edit'
        end
      end
    end
    describe '削除機能' do
      context '管理者がログインしている時' do
        let(:login_user) { admin_user }
        before do
          find('.service-info-1').click
        end
        it '一覧画面から表示されなくなる', js: true do
          find('.delete').click
          page.accept_confirm '本当に削除してもいいですか?'
          expect(page).to have_selector '.alert', text: '「testname_01」を削除しました'
        end
      end
    end

    describe 'カテゴリー検索' do
      let(:login_user) { admin_user }
      before do
        visit new_service_path
        fill_in 'サービス名', with: 'test_name_04'
        fill_in 'service[summary]',	with: 'testsummary_04'
        check 'category_test'
        click_button '登録する'
      end
      context '任意のカテゴリーをクリックする' do
        it 'クリックしたカテゴリーを持つサービスのみ表示される' do
          click_link 'category_test', match: :first
          services = page.all('div.services')
          expect(services.count).to be 1
        end
      end
    end
    describe '検索機能' do
      let(:login_user) { admin_user }
      context '任意のサービス名を検索' do
        it '検索にヒットすると、一覧画面に表示される' do
          page.find('.search-form').set('testname_01')
          click_button '検索'
          services = page.all('h5.service-title')
          expect(services[0]).to have_content 'testname_01'
        end
        it '大文字でも小文字でも検索できる' do
          page.find('.search-form').set('TESTNAME_05')
          click_button '検索'
          services = page.all('h5.service-title')
          expect(services[0]).to have_content 'testname_05'
        end
        it '検索結果がない場合は、ないことを示す文章が表示される' do
          page.find('.search-form').set('testname_100')
          click_button '検索'
          services = page.all('h5.service-title')
          expect(page).to have_content '一致する結果はありません'
        end
      end
    end
    describe 'ソート機能' do
      let(:login_user) { admin_user }
      context '名前順にソート' do
        it 'ABC順にソートされる' do
          click_link '名前順'
          services = page.all('h5.service-title')
          expect(services[0]).to have_content 'testname_01'
          expect(services[1]).to have_content 'testname_05'
        end
      end
      context '人気順にソート' do
        it '利用者数の多い順にソートされる' do
          click_link '人気順'
          service = service_03
          services = page.all('h5.service-title')
          expect(services[0]).to have_content 'testname_05'
          expect(service.subscriptions.count).to be 1
        end
      end
      context '新着順にソート' do
        it '作成日が新しい順にソートされる' do
          click_link '新着順'
          services = page.all('h5.service-title')
          expect(services[0]).to have_content 'testname_05'
          expect(services[1]).to have_content 'testname_01'
        end
      end
      context '更新順にソート' do
        before do
          visit edit_service_path(service_01.id)
          fill_in 'サービス名',	with: 'update_testname_01'
          click_button '更新する'
        end
        it '更新日が新しい順にソートされる' do
          click_link '更新順'
          services = page.all('h5.service-title')
          expect(services[0]).to have_content 'update_testname_01'
          expect(services[1]).to have_content 'testname_05'
        end
      end
    end
  end
end
