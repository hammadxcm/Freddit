puts "Creating users..."
User.destroy_all
fred = User.create!(username: "Fred", email: "fred@fred.com", password: "fredfred")
lily = User.create!(username: "Lily", email: "lily@lily.com", password: "lilylily")
carl = User.create!(username: "Carl", email: "carl@carl.com", password: "carlcarl")
tommy = User.create!(username: "Tommy", email: "tommy@tommy.com", password: "tommytommy")
jonathan = User.create!(username: "Jonathan", email: "jonathan@jonathan.com", password: "jonathanjonathan")
sennnacy = User.create!(username: "Sennacy", email: "sennacy@sennacy.com", password: "sennacysennacy")
firetrux = User.create!(username: "Firetrux", email: "firetrux@firetrux.com", password: "firetruxfiretrux")

50.times do
  user = FactoryGirl.build(:user)
  redo unless user.valid?
  user.save!
end

puts "Creating subs..."
Sub.destroy_all
cats = Sub.create!(title: "cats", description: "This is a subfreddit all about cats. Cats cats cats.")
dogs = Sub.create!(title: "dogs", description: "Dogs are great! Don't you like dogs?")
ruby = Sub.create!(title: "ruby", description: "For all your Ruby needs!")
java = Sub.create!(title: "java", description: "Serious languages only within. No scripts please.")
cplusplus = Sub.create!(title: "c++", description: "If you don't already know the answer, we can't possibly be bothered to help you.")
python = Sub.create!(title: "python", description: "Is this a subfreddit for snakes or the programming language? Does it matter?.")
javascript = Sub.create!(title: "javascript", description: "Abandon all hope, ye who enter here.")
app_academy = Sub.create!(title: "appacademy", description: "Learn all the things!")

22.times do
  new_sub = FactoryGirl.build(:sub)
  redo unless new_sub.valid?
  new_sub.save!
end

puts "Creating moderations..."
Moderation.destroy_all
python.moderations.create!(user_id: fred.id)
ruby.moderations.create!(user_id: jonathan.id)
cplusplus.moderations.create!(user_id: carl.id)
java.moderations.create!(user_id: lily.id)
javascript.moderations.create!(user_id: tommy.id)
app_academy.moderator_ids = [fred.id, carl.id, lily.id, jonathan.id, tommy.id]

puts "Creating posts..."
Post.destroy_all
sub_ids = Sub.pluck(:id)
user_ids = User.pluck(:id)
posts = []
Timecop.freeze(12.hours.ago)
720.times do
  posts << FactoryGirl.create(
    :post,
    sub_id: sub_ids.sample,
    user_id: user_ids.sample,
  )
  Timecop.freeze(Time.now + 1.minutes)
end


Timecop.return

puts "Creating comments..."
Comment.destroy_all
posts = Post.all
users = User.all

comments = []
5000.times do
  post = posts.sample
  parent_comment_id = [post.comments.pluck(:id).sample, nil].sample

  comments << FactoryGirl.build(
    :comment,
    post_id: post.id,
    user_id: users.sample.id,
    parent_comment_id: parent_comment_id,
  )
end

Comment.import(comments)

puts "Creating votes..."
Vote.destroy_all
comments = Comment.all

votes = []

User.all.each do |user|
  300.times do
    vote = FactoryGirl.build(
      :post_vote,
      votable_id: posts.sample.id,
      user_id: user.id
    )
    votes << vote if vote.valid?
  end

  300.times do
    vote = FactoryGirl.build(
      :comment_vote,
      votable_id: comments.sample.id,
      user_id: user.id
    )
    votes << vote if vote.valid?
  end
end

Vote.import(votes)

puts "Done!"
