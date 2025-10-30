from flask import Flask, request, jsonify
from back.dal.sql.users_queries import UsersQueries

app = Flask(__name__)
users_queries = UsersQueries()


@app.route("/register", methods=["POST"])
def add_user():
    data = request.get_json()
    print("data",data)
    if  not users_queries.is_exist_register(data['userName']):
        users_queries.insert_user(data)
    else:
        return  jsonify({"message":"userName is exist"})

    return jsonify({"message": "User added successfully"})





@app.route("/users", methods=["GET"])
def get_users():
    all_users = users_queries.get_all_users()
    result = [
        {
            "id": u.id,
            "userName": u.userName,
            "phoneNumber": u.phoneNumber,
            "address": u.address
        } for u in all_users
    ]
    return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
