require "rails_helper"

RSpec.describe V2::QuotesSubmissionsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/v2/quotes_submissions").to route_to("v2/quotes_submissions#index")
    end

    it "routes to #new" do
      expect(get: "/v2/quotes_submissions/new").to route_to("v2/quotes_submissions#new")
    end

    it "routes to #show" do
      expect(get: "/v2/quotes_submissions/1").to route_to("v2/quotes_submissions#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/v2/quotes_submissions/1/edit").to route_to("v2/quotes_submissions#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/v2/quotes_submissions").to route_to("v2/quotes_submissions#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/v2/quotes_submissions/1").to route_to("v2/quotes_submissions#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/v2/quotes_submissions/1").to route_to("v2/quotes_submissions#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/v2/quotes_submissions/1").to route_to("v2/quotes_submissions#destroy", id: "1")
    end
  end
end
