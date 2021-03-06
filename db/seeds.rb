# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

V2::Jurisdiction.find_or_create_by name: "California"
V2::Jurisdiction.find_or_create_by name: "Colorado"
V2::Jurisdiction.find_or_create_by name: "Darkweb"
V2::Jurisdiction.find_or_create_by name: "Florida"
V2::Jurisdiction.find_or_create_by name: "Nevada"
V2::Jurisdiction.find_or_create_by name: "District of Columbia"