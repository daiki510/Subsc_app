require 'test_helper'

class DetailsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get details_new_url
    assert_response :success
  end

  test "should get show" do
    get details_show_url
    assert_response :success
  end

  test "should get edit" do
    get details_edit_url
    assert_response :success
  end

end
