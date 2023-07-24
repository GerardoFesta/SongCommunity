import pandas as pd
import json

df = pd.read_csv("C:\\Users\\Gerardo\\Downloads\\dataset.csv")

df = df.rename(columns={"Unnamed: 0": "song_id", "track_id": "spotify_uri"})

print(df.head)
df['artists'] = df['artists'].str.split(';')

grouped_df = df.groupby('spotify_uri')['track_genre'].apply(list).reset_index(name='track_genre')

# Droppa i duplicati sulla colonna 'spotify_uri' mantenendo solo la prima occorrenza
unique_df = df.drop_duplicates(subset='spotify_uri')

# Unisci i DataFrame mantenendo solo le colonne desiderate
merged_df = unique_df.merge(grouped_df, on='spotify_uri')

merged_df = merged_df.drop(columns=["track_genre_x"])
merged_df = merged_df.rename(columns={"track_genre_y": "track_genre"})
merged_df['song_id'] = range(len(merged_df))
merged_df.dropna(inplace=True)
json_data = merged_df.to_json(orient='records', default_handler=str)

with open('C:\\Users\\Gerardo\\Downloads\\modded_dataset.json', 'w') as file:
    file.write(json_data)

merged_df.to_csv("C:\\Users\\Gerardo\\Downloads\\modded_dataset.csv", index=False)

