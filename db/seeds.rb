# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.create(username: "tommyb", email: "tommybrennan@gmail.com", password: "howdy", password_confirmation: "howdy", admin: "true")

User.create(username: "juliel", email: "julie@gmail.com", password: "howdy", password_confirmation: "howdy", admin: "true")

User.create(username: "mckenneths", email: "", password: "howdy", password_confirmation: "howdy", admin: "true")

