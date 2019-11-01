json.extract! picture, :id, :pet_id, :url, :created_at, :updated_at
json.url picture_url(picture, format: :json)
