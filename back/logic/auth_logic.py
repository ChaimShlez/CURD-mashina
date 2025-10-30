from datetime import datetime, timezone, timedelta

from back.dal.sql.users_queries import UsersQueries
from back.dal.sql.users_sql_dal import UserSqlDal
import os
import jwt
from dotenv import load_dotenv
load_dotenv()
class AuthLogic:

    def __init__(self):
        self.users_queries = UsersQueries()
        self.secret=os.getenv('SECRET_KEY')
        self.algorithm = "HS256"



    def create_token(self,user):
        payload = {
            "user_id": user["id"],
            "username": user["userName"],
            "exp": datetime.now(timezone.utc) + timedelta(hours=1)
        }

        encoded_jwt = jwt.encode(payload, self.secret, algorithm=self.algorithm)
        return encoded_jwt



    def login(self,user):

       if self.users_queries.is_exist_login(user['userName'],user['password']):
           user= self.users_queries.get_by_userName(user['userName'])
           return self.create_token(UserSqlDal.to_dict(user))
       else:
           return None



