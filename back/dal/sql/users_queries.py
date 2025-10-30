from back.dal.sql.users_sql_dal import UserSqlDal
from back.utils.session import SessionLocal
from sqlalchemy.sql import exists,and_


class UsersQueries:

    def __init__(self, session=SessionLocal):
        self.session = session

    def insert_user(self, user):
        with self.session() as session:
            new_user = UserSqlDal(
                userName=user["userName"],
                password=user["password"],
                phoneNumber=user["phoneNumber"],
                address=user["address"]
            )
            session.add(new_user)
            session.commit()
            print("User added successfully")

    def get_all_users(self):
        with self.session() as session:
            users = session.query(UserSqlDal).all()
            print(users)
            return users

    def is_exist_register(self,userName):
        with self.session() as session:
            is_exists = session.query(exists().where(UserSqlDal.userName == userName)).scalar()
            return is_exists

    def is_exist_login(self, userName,password):
        with self.session() as session:
            is_exists = session.query(exists().where(and_(UserSqlDal.userName == userName,UserSqlDal.password==password))).scalar()
            return is_exists

    def get_by_userName(self,userName):
        with self.session() as session:
            user=session.query(UserSqlDal).filter(UserSqlDal.userName==userName).first()
        return user
