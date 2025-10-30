from sqlalchemy import create_engine,text
from back.utils.config import *

class sqlService:
    def __init__(self):
        self.engine = create_engine(f"mysql+pymysql://{SQL_USER_DB}:{SQL_PASSWORD_DB}@{SQL_HOST_DB}:3306/{SQL_NAME_DB}")
        self.__check()


    def get_engine(self):
        return self.engine


    def __check(self):
        try:
            with self.engine.connect() as connection:
                result = connection.execute(text("SELECT 1"))
                print("succeeded", result.scalar())
        except Exception as e:
            print(" failed", e)





