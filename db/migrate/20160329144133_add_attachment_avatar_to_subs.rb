class AddAttachmentAvatarToSubs < ActiveRecord::Migration
  def self.up
    change_table :subs do |t|
      t.attachment :bg_image
    end
  end

  def self.down
    remove_attachment :subs, :bg_image
  end
end
