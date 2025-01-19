from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

# Resolve CSV file path dynamically
current_dir = os.path.dirname(os.path.abspath(__file__))
csv_file = os.path.join(current_dir, "dataset", "Cleaned_TMDB_movie_dataset_v11.csv")

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

try:
    # Load dataset
    print(f"Loading dataset from: {csv_file}")
    df = pd.read_csv(csv_file)

    # Remove adult movies
    df = df[df["adult"] == False]

    # Preprocess the `genres` column to ensure it's properly formatted
    df["genres"] = df["genres"].fillna("Unknown")

    # Split into training (10k) and testing (10k)
    training_data = df.head(10000)  # First 10k rows for training
    testing_data = df.iloc[10000:20000]  # Rows 10,001 to 20,000 for testing

    # Preprocess training dataset (exclude `poster_path` from training)
    training_data = training_data[["title", "genres", "overview"]].dropna()
    training_data["features"] = (
        training_data["genres"].astype(str)
        + " "
        + training_data["overview"].astype(str)
        + " "
        + training_data["title"].astype(str)
    )

    # TF-IDF Vectorization
    tfidf = TfidfVectorizer(stop_words="english")
    tfidf_matrix = tfidf.fit_transform(training_data["features"])

    # Compute cosine similarity
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

except FileNotFoundError:
    print(f"Error: CSV file not found at {csv_file}")
    training_data = pd.DataFrame()  # Empty DataFrame as a fallback
    testing_data = pd.DataFrame()

# Get recommendations for a given movie
def get_recommendations(title, cosine_sim=cosine_sim):
    if training_data.empty:
        return []

    indices = pd.Series(training_data.index, index=training_data["title"]).drop_duplicates()
    if title not in indices:
        return []
    idx = indices[title]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:6]  # Top 5 recommendations
    movie_indices = [i[0] for i in sim_scores]
    return training_data.iloc[movie_indices][["title", "genres"]].to_dict(orient="records")

# API route to get 12 random movies
@app.route("/random_recommendations", methods=["GET"])
def random_recommendations():
    try:
        # Filter inappropriate movies first
        inappropriate_words = [
            "sex", "sexual", "kiss", "blow job", "nude", "adult",
            "explicit", "porn", "erotic", "The Couple Next Door",
            "Injo Shuuyoujo : Prison Amazones", "When Love Is Gay", "Sex and Fury", "SEXth Element", "sexy",
        ]

        filtered_df = df[
            ~df["genres"].str.lower().str.contains("romance", na=False) &
            ~df["title"].str.lower().str.contains("|".join(inappropriate_words), na=False)
        ]

        # Ensure we have at least 12 movies
        if len(filtered_df) < 12:
            raise ValueError("Not enough movies to generate recommendations.")

        # Randomly select 12 movies
        sampled_movies = filtered_df.sample(n=12)[["title", "genres", "poster_path"]]
        return jsonify(sampled_movies.to_dict(orient="records"))
    except ValueError as e:
        return jsonify({"error": str(e)}), 500

@app.route("/search", methods=["GET"])
def search_movies():
    title_query = request.args.get("title", "").lower().strip()
    genre_query = request.args.get("genre", "").lower().strip()
    release_year = request.args.get("release_year", "").strip()
    rating = request.args.get("rating", "").strip()

    filtered_movies = df[["title", "genres", "poster_path", "release_date", "vote_average"]]

    if title_query:
        filtered_movies = filtered_movies[
            filtered_movies["title"].str.lower().str.contains(title_query)
        ]
    if genre_query:
        filtered_movies = filtered_movies[
            filtered_movies["genres"].str.lower().str.contains(genre_query)
        ]
    if release_year:
        filtered_movies = filtered_movies[
            filtered_movies["release_date"].str.contains(release_year)
        ]
    if rating:
        filtered_movies = filtered_movies[
            filtered_movies["vote_average"] >= float(rating)
        ]

    filtered_movies = filtered_movies.head(8)
    return jsonify(filtered_movies.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(debug=True)