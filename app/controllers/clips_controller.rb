class ClipsController < ApplicationController
  def create
    @clip = current_user.clips.create(service_id: params[:service_id])
    @service = Service.find(@clip.service_id)
  end

  def destroy
    @clip = current_user.clips.find_by(service_id: params[:service_id])
    @service = Service.find(@clip.service_id)
    @clip.destroy
  end
end
