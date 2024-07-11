from typing import Optional
from datetime import datetime
from uuid import UUID, uuid4
from pydantic import BaseModel, Field


class Option(BaseModel):
    """
    Vote entity
    """

    id: Optional[UUID] = Field(default_factory=uuid4, alias="_id")
    poll_id: str
    option_value: str

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat(),
            UUID: lambda u: str(u)
        }
