from flask import Flask, request, jsonify
from flask_cors import CORS

import pandas as pd
import markdown
import os
import re
from datetime import datetime

app = Flask(__name__)
CORS(app,origins=['https://blog.benzr.xyz','localhost:80']

def valid_email(email):
    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(email_regex, email) is not None

def store_email(email):
    file_path = 'posts/emails.txt'
    
    # If the file does not exist, create it
    if not os.path.exists(file_path):
        with open(file_path, 'w') as file:
            pass

    with open(file_path, 'r+') as file:
        lines = file.readlines()

        # If the email is already in the file, do not append it
        if any(email == x.strip() for x in lines):
            return False

        # The email is not in the file, append it
        file.write(email + '\n')
        return True



# Load the index CSV into a pandas DataFrame.
index_df = pd.read_csv('posts/index.csv')
index_df['date'] = pd.to_datetime(index_df['date'])
index_df['fdate'] = index_df['date'].apply(lambda x: x.strftime('%B %d'))

@app.route('/posts', methods=['GET'])
def get_posts():
    # Get the current date
    now = datetime.now()

    # Filter the DataFrame to only include posts where the date is in the past
    past_posts = index_df.loc[index_df['date'] <= now]

    # Convert the DataFrame to a list of dictionaries for JSONification.
    posts = past_posts.to_dict(orient='records')
    return jsonify(posts)



@app.route('/post/<int:post_id>', methods=['GET'])
def get_post(post_id):
    # Get the current date
    now = datetime.now()

    # Find the post in the index.
    post_info = index_df.loc[index_df['id'] == post_id]

    if post_info.empty:
        return 'Post not found', 404

    # Check if the post date is in the future
    post_date = pd.to_datetime(post_info['date'].values[0]).to_pydatetime()
    if post_date > now:
        return 'Post not found', 404

    post_file = post_info['filename'].values[0]

    try:
        with open(f"posts/{post_file}", 'r') as file:
            content = file.read()
            html_content = markdown.markdown(content)
            
            
            return jsonify({
                'id': post_id,
                'displayname':post_info['displayname'].values[0],
                'content': html_content,
                'date': post_info['fdate'].values[0],
                'gps': (post_info['lat'].values[0],post_info['lon'].values[0])
            })
    except FileNotFoundError:
        return 'Post not found - but ID valid', 404



    
@app.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.get_json().get('email')
    
    if not valid_email(email):
        return jsonify({'message': 'Invalid email format.'}), 400

    if not store_email(email):
        return jsonify({'message': 'Email already subscribed.'}), 200

    return jsonify({'message': 'Email received.'}), 200


if __name__ == '__main__':
    app.run(debug=True)

