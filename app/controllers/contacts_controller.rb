class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(contact_params)
    @contact.user_id = current_user.id
    if @contact.save
      ContactMailer.contact_mail(@contact).deliver
      redirect_to user_path(current_user.id), notice: 'お問い合わせを受け付けました'
    else
      render :new
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:title, :email, :message)
  end
end