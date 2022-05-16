require "json"
require "open-uri"

class GamesController < ApplicationController
  def new
    @letters = ('A'..'Z').to_a
  end

  def score
    # vérifier le word
    @word = params[:word]
    url = "https://wagon-dictionary.herokuapp.com/#{@word}"
    word_api_serialized = URI.open(url).read
    @word_api = JSON.parse(word_api_serialized)

  end
end


# <%=  %>

# <p>Le mot <%= @word %> est <%= @word_api['error'] %></p>
