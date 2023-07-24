import pandas as pd
import random
from faker import Faker

fake = Faker()

# Function to generate a random username
def generate_random_username():
    return fake.user_name()

# Function to generate a random email
def generate_random_email():
    return fake.email()

# Generate unique usernames and emails
usernames = set()
emails = set()
while len(usernames) < 1000:
    username = generate_random_username()
    email = generate_random_email()
    if email not in emails:
        usernames.add(username)
        emails.add(email)

# Generate the DataFrame
data = []
for username, email in zip(usernames, emails):
    num_numbers = random.randint(1, 15)
    random_numbers = random.sample(range(0, 89740), num_numbers)
    data.append([username, email, random_numbers, 'abc'])

df = pd.DataFrame(data, columns=['Username', 'Email', 'Preferite', 'Password'])
df.to_csv("C:\\Users\\Gerardo\\Downloads\\fake_users.csv", index=False)
json_data = df.to_json(orient='records', default_handler=str)

with open('C:\\Users\\Gerardo\\Downloads\\fake_users.json', 'w') as file:
    file.write(json_data)