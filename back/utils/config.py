import os
from dotenv import load_dotenv
load_dotenv()

ES_HOST = os.getenv('ES_HOST')
SQL_USER_DB=os.getenv("SQL_USER_DB")
SQL_PASSWORD_DB=os.getenv("SQL_PASSWORD_DB")
SQL_HOST_DB=os.getenv("SQL_HOST_DB")
SQL_NAME_DB=os.getenv("SQL_NAME_DB")
