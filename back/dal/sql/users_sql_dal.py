from typing import Optional
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from back.dal.sql.base import Base


class UserSqlDal(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True,autoincrement=True)
    userName: Mapped[str] = mapped_column(String(50))
    password: Mapped[str] = mapped_column(String(255))
    phoneNumber: Mapped[str] = mapped_column(String(20))
    address: Mapped[Optional[str]] = mapped_column(String(100))
    @staticmethod
    def to_dict(user):
        return {
            "id": user.id,
            "userName": user.userName,
            "phoneNumber": user.phoneNumber,
            "address": user.address
        }

