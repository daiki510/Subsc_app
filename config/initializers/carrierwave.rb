CarrierWave.configure do |config|
  # require 'carrierwave/storage/abstract'
  # require 'carrierwave/storage/file'
  require 'carrierwave/storage/fog'

  config.storage :fog
  config.cache_storage = :fog
  config.fog_provider = 'fog/aws'
  config.fog_credentials = {
      provider:              'AWS',
      aws_access_key_id:     ENV["AWS_ACCESS_KEY_ID"],
      aws_secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
      region:                'ap-northeast-1',
      path_style:            true
  }

  config.fog_public     = true
  config.fog_attributes = { 'Cache-Control' => "max-age=#{365.day.to_i}" }

  case Rails.env
    when 'production'
      config.fog_directory = 'subsc-production'
      config.asset_host = 'https://subsc-production.s3-ap-northeast-1.amazonaws.com'
    when 'development'
      config.fog_directory = 'subsc-development'
      config.asset_host = 'https://subsc-development.s3-ap-northeast-1.amazonaws.com'
  end

  # 日本語ファイル名の設定
  CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/
end