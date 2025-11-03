from flask import Blueprint ,request, jsonify
from pydantic import BaseModel
from flask import  make_response
from back.dal.sql.users_queries import UsersQueries
from back.logic.auth_logic import AuthLogic
from back.utils.middleware import verify


class UserModel(BaseModel):

    userName: str
    password: str
    phoneNumber: str
    address: str
users_queries = UsersQueries()
logic=AuthLogic()


auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/login',methods=["POST"])
def login():

    data = request.get_json()
    token = logic.login(data)
    if token:
        res=make_response(jsonify({"status":"success","message": "login"}))
        res.set_cookie('access_token', token, httponly=True, secure=False)
        print("Set-Cookie header:", res.headers.get("Set-Cookie"))
        return res
    else:
        return jsonify({"message": "login filed"})


@auth_bp.route('/register',methods=["POST"])
def add_user():

    data = request.get_json()
    if  not users_queries.is_exist_register(data['userName']):
        users_queries.insert_user(data)
    else:
        return  jsonify({"message":"userName is exist"})

    return jsonify({"message": "User added successfully"})

