from sqlalchemy.types import String, Integer
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, UniqueConstraint

class Base(DeclarativeBase):
    pass

class Bill(Base):
    __tablename__ = "bill"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255))
    url = Column(String(255), unique=True)
    description = Column(String(1000))
    image = Column(String(255), nullable=True)
    published = Column(Integer, nullable=True)

    def __repr__(self) -> str:
        return f"Bill({self.title})"