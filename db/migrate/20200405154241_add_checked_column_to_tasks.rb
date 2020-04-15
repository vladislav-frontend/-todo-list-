class AddCheckedColumnToTasks < ActiveRecord::Migration[5.0]
  def change
    add_column :tasks, :checked, :boolean
  end
end
