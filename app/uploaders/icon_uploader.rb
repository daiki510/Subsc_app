class IconUploader < CarrierWave::Uploader::Base
  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  include CarrierWave::MiniMagick

  storage :fog

  def store_dir
    "sample-image/#{model.id}"
  end

  # storage :file

  # def store_dir
  #   "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  # end

  # アップロード時の画像サイズ
  process resize_and_pad: [100, 100, '#ffffff', 'Center']

  # 添付できるファイルの種類
  def extension_whitelist
    %w[jpg jpeg gif png]
  end

  # サムネイル
  version :thumb do
    process resize_to_fit: [50, 50]
  end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end
end
