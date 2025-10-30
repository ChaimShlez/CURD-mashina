from sqlalchemy.orm import sessionmaker
from ..utils.sql_service import sqlService
from ..dal.sql.base import Base
engine = sqlService().get_engine()
Base.metadata.create_all(engine)
SessionLocal = sessionmaker(bind=engine)
