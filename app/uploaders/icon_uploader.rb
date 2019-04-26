class IconUploader < CarrierWave::Uploader::Base
  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  include CarrierWave::MiniMagick

  storage :fog

  def store_dir
    "icon-images/#{model.id}"
  end

  def size_range
    0..5.megabytes
  end

  # ファイル名を書き換え
  def filename
    "#{model.name}_icon_#{model.id}.#{file.extension}" if original_filename
  end

  # アップロード時の画像サイズ
  # process resize_and_pad: [100, 100, '#ffffff', 'Center']

  # 添付できるファイルの種類
  def extension_whitelist
    %w[jpg jpeg gif png]
  end

  # サムネイル
  version :thumb do
    process resize_to_fit: [50, 50]
  end
end
